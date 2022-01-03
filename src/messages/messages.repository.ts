

export class MessagesRepository {


    //Create findOne method
    async findOne(id: number): Promise<string> {
        return `Hello findOne ${id}`;
    }


    //Create findAll method
    async findAll(): Promise<string[]> {
        return ['Hello findAll', 'Hello findAll 2'];
    }

    //Create create method
    async create(message: string): Promise<string> {
        return `Hello create ${message}`;
    }


}