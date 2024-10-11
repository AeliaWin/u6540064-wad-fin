import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

// POST: Create a new customer
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, dateOfBirth, memberNumber, interests } = body;
    
    const customer = new Customer({ name, dateOfBirth, memberNumber, interests });
    await customer.save();

    return new Response(JSON.stringify({ message: 'Customer created successfully', customer }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating customer', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// GET: Fetch all customers
export async function GET() {
  try {
    await dbConnect();
    const customers = await Customer.find();
    
    return new Response(JSON.stringify({ customers }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching customers', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// PUT: Update a customer
export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, name, dateOfBirth, memberNumber, interests } = body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { name, dateOfBirth, memberNumber, interests },
      { new: true }
    );

    if (!updatedCustomer) {
      return new Response(JSON.stringify({ message: 'Customer not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Customer updated successfully', updatedCustomer }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating customer', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE: Remove a customer
export async function DELETE(req) {
  try {
    await dbConnect();
    const { id } = await req.json();

    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return new Response(JSON.stringify({ message: 'Customer not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Customer deleted successfully', deletedCustomer }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting customer', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
