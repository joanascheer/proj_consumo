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
}
