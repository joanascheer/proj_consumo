import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from './consumo_agua.model';
import { ConsumoAguaService } from './consumo_agua.service';

@Controller('user')
export class ConsumoAguaController {
    constructor(private readonly consumoAguaService:ConsumoAguaService) {}

    @Get()
    readAllUsers(): Promise<any> {
        return this.consumoAguaService.readAllUsers();
    }

    @Post()
    async createUser(@Body() user: User): Promise<any> {
        var response = await this.consumoAguaService.createUser(user);
        return {id: response};
    }

    @Patch()
    async updateUser(@Body() user: User) {
        var updatedUser = await this.consumoAguaService.updateUser(user);
        return {updatedUser}
    }

    @Delete(':name')
    async deleteUser(@Param('name') name: string) {
        await this.consumoAguaService.deleteUser(name);
        return { message: 'Usuario deletado com sucesso!' };
    }

    @Post('register')
    async registerConsumption(
        @Body('userId') userId: string,
        @Body('name') name: string,
        @Body('quantityConsumed') quantityConsumed: number,
        @Body('date') date: Date
    ) {
        const response = await this.consumoAguaService.registerConsumption(userId, name, quantityConsumed, date);
        return { id: response };
    }

    @Get('history')
    async getConsumptionHistory(
        @Body('userId') userId: string,
        @Body('startDate') startDate: Date,
        @Body('endDate') endDate: Date
    ) {
        return await this.consumoAguaService.getConsumptionHistory(userId, startDate, endDate);
    }

    @Get('alert/:userId')
    async getHighConsumptionAlert(@Param('userId') userId: string) {
        return await this.consumoAguaService.checkHighConsumptionAlert(userId);
    }

}
