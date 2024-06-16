import Mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Order } from "./order";
import { OrderStatus } from "@mroc/ex-ms-common/build";

interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}

export interface TicketDoc extends Mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends Mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<TicketDoc | null>;
}

const ticketSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
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

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  const { id, title, price } = attrs;
  return new Ticket({
    _id: id,
    title,
    price,
  });
};

ticketSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Ticket.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

ticketSchema.methods.isReserved = async function () {
  const existingOder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOder;
};

const Ticket = Mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
