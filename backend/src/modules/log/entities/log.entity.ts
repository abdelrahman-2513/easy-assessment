import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ELogStatus } from "../../shared/enums";


export type logDocument = HydratedDocument<Log>;
@Schema({ timestamps: true })  
export class Log { 
    @Prop({ type: "string" })
    requestNumber: string;

    @Prop({ type: "string" })  
    createdBy: string;

    @Prop({ type: "string" })  
    paths: string;
    @Prop({ type: "string" })  
    method: string;

    @Prop({ type: "string", enum: ELogStatus, default: ELogStatus.PENDING }) 
    status: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export const logSchema = SchemaFactory.createForClass(Log);