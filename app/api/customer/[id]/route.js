import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

export async function GET(req, { params }) {
  try {
    await dbConnect();
    console.log('Request params:', params);


    const { id } = params;  // Extract 'id' from the route parameters

    // If id is not provided, return a 400 response
    if (!id) {
      console.error('Customer ID not provided');
      return new Response(
        JSON.stringify({ message: 'Customer ID not provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching customer with ID:', id);

    const customer = await Customer.findById(id);

    // If customer not found, return a 404 response
    if (!customer) {
      console.error('Customer not found for ID:', id);
      return new Response(
        JSON.stringify({ message: 'Customer not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If customer is found, return a 200 response with the customer details
    return new Response(
      JSON.stringify({ customer }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching customer:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching customer', error }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
