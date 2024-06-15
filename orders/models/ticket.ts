import Mongoose from "mongoose";

interface TicketAttrs {
  title: string;
  price: number;
}

export interface TicketDoc extends Mongoose.Document {
  title: string;
  price: number;
}

interface TicketModel extends Mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
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

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = Mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
