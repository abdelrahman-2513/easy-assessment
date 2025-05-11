import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ERoles } from "src/shared/enums/role.enum";
import * as bcrypt from "bcryptjs"
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })  
export class User { 
    @Prop({ type: "string" })
    name: string;

    @Prop({ type: "string" })  
    email: string;

    @Prop({ type: "string" })
    password: string;

    @Prop({ type: "string", enum: ERoles, default: ERoles.ADMIN }) 
    role: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export const userSchema = SchemaFactory.createForClass(User);



// This Function is used to encrypt the password before the saving of it
userSchema.pre("save", async function(next) {
    if (!this.isModified("password"))
        return next();

    const genSalt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, genSalt);
    next();
})