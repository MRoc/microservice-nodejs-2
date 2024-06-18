import Mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderStatus } from "@mroc/ex-ms-common";
import { TicketDoc } from "./ticket";

interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

interface OrderDoc extends Mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
  version: number;
}

interface OrderModel extends Mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new Mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: Mongoose.Schema.Types.Date,
      required: true,
    },
    ticket: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = Mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
