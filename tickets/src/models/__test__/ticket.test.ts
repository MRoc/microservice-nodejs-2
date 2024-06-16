import mongoose from "mongoose";
import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  const t0 = await Ticket.findById(ticket.id);
  const t1 = await Ticket.findById(ticket.id);

  t0!.set({ price: 20 });
  t1!.set({ price: 30 });

  await t0!.save();

  expect(async () => {
    await t1!.save();
  }).rejects.toThrow();
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
