import React, { useState, useEffect } from 'react';
import { latestOrders } from '../../Service/Orderservice';

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await latestOrders();
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    const formatItems = (items) => {
        return items.map((item) => `${item.name} x ${item.quantity}`).join(', ');
    }

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    if (loading) {
        return <div className='text-center py-8'>Loading...</div>;
    }

    if (orders.length === 0) {
        return <div className='text-center py-8'>No orders found</div>;
    }

    return (
        <div className=" m-auto px-4 py-6 bg-gray-800">
            <div className="mb-6">
                <h2 className='text-xl text-center font-semibold text-gray-100'>Recent Orders</h2>
            </div>
            
            <div className="bg-black rounded-lg mx-10 shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full  divide-y divide-gray-200">
                        <thead className="bg-gray-950">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                    Items
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                    Payment
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map(order => (
                                <tr key={order.orderId} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.orderId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                                        <div className="text-sm text-gray-500">{order.phonenumber}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                                        {formatItems(order.items)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.grandTotal}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                        {order.paymentMethod}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${order.paymentDetails?.status === "COMPLETED" ? 
                                                'bg-green-100 text-green-800' : 
                                                'bg-red-100 text-red-800'}`}>
                                            {order.paymentDetails?.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                                        {formatDate(order.date)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrderHistory;