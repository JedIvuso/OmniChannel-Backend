import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    // url: 'mysql://root:MyN3wP4ssw0rd@omnichannel-mysql-db:3306/omnichannel'
                    url: 'mysql://root:MyN3wP4ssw0rd@localhost:3306/omnichannel'
                }
            }
        })
    }
}
