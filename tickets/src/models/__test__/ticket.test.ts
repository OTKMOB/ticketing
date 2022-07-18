import { Ticket } from '../ticket';

it('implements optimisitc concurrency control', async () => {
  // create instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: 'afsdfg'
  });

  // save to the database
  await ticket.save();

  // fetch the ticket twice
  const ticket1 = await Ticket.findById(ticket.id);
  const ticket2 = await Ticket.findById(ticket.id);

  // make 2 seperate changes to the ticket
  ticket1?.set({ price: 10 });
  ticket2?.set({ price: 30 });

  // save the first fetched ticekt
  await ticket1?.save();

  // save the second fetched ticket and expect error
  try {
    await ticket2?.save();
  } catch (err) {
    return;
  }

  throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: 'afsdfg'
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
