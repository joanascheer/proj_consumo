import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './consumo_agua.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ConsumoAguaService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async createUser(user: User) {
        const userModel = new this.userModel({
            name: user.name,
            quantityConsumed: user.quantityConsumed,
            date: user.date,
        });
        const result = await userModel.save();
        return result.id as string;
    }

    async readAllUsers() {
        const users = await this.userModel.find().exec();
        return users;
    }

    async deleteUser(name: string) {
        const result = await this.userModel.deleteOne({ name: name }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Usuario nao encontrado.');
        }
    }

    async updateUser(user: User): Promise<User> {
        const updateUser = await this.userModel.findOne({ name: user.name });
        if (!updateUser) {
            throw new NotFoundException('Usuario nao encontrado.');
        }

        if (user.name) {
            updateUser.name = user.name;
        }
        if (user.quantityConsumed) {
            updateUser.quantityConsumed = user.quantityConsumed;
        }
        if (user.date) {
            updateUser.date = user.date;
        }

        await updateUser.save();
        return updateUser;
    }

    async registerConsumption(userId: string, name: string, quantityConsumed: number, date: Date) {
        const user = new this.userModel({
            userId,
            name,
            quantityConsumed,
            date
        });
        const result = await user.save();
        return result.id;
    }

    async getConsumptionHistory(userId: string, startDate: Date, endDate: Date) {
        return await this.userModel.find({
            userId,
            date: { $gte: startDate, $lte: endDate }
        }).exec();
    }

    async checkHighConsumptionAlert(userId: string): Promise<{ alert: boolean; message: string }> {
        const lastTwoMonths = await this.userModel.find({ userId }).sort({ date: -1 }).limit(2).exec();
    
        if (lastTwoMonths.length < 2) {
            return { alert: false, message: "Consumo insuficiente para gerar alertas." };
        }
    
        const [latest, previous] = lastTwoMonths;
    
        if (latest.quantityConsumed > previous.quantityConsumed) {
            return { alert: true, message: `Consumo elevado! O consumo de ${latest.quantityConsumed}m³ ultrapassou o do mês anterior de ${previous.quantityConsumed}m³.` };
        }
    
        return { alert: false, message: "Consumo dentro dos limites." };
    }
}
