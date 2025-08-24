// import { fetchMessages } from '@/Redux/slices/messagesSlice';
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';

// function Messages() {

//     const dispatch = useDispatch();
//     const { list: message, loading, error } = useSelector((state) => state.message);

//     useEffect(() => {
//         dispatch(fetchMessages());
//     }, [dispatch]);

//     const filteredMessage = Message.map(Message => {
//         const totalQuantity = Message.items.reduce((sum, item) => sum + item.quantity, 0);
//         return {
//             id: Message.id,
//             name: Message.name,
//             email: Message.email,
//             message: Message.message,
//             timestamp: new Date(Message.date).toLocaleDateString(),
//             status: Message.status
//         };
//     });


//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <TableDashboard data={filteredMessage} type="products" ></TableDashboard>
//         </div>
//     )
// }

// export default Messages
import LoaderSpinner from '@/Components/shared/Loaders/Loader';
import TableDashboard from '@/Components/TableDashboard';
import { fetchMessages } from '@/Redux/slices/messagesSlice';
import { formatDateTime } from '../../lib/dateFormat';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Messages() {
    const dispatch = useDispatch();
    const { list: messages, loading, error } = useSelector((state) => state.messages);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    const filteredMessages = messages?.map(msg => {
        return {

            id: msg.id,
            name: msg.name,
            email: msg.email,
            message: msg.message,
            timestamp: formatDateTime(msg.timestamp),

        };
    }) || [];

    if (loading) return <LoaderSpinner />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <TableDashboard data={filteredMessages} type="messages" />
        </div>
    )
}

export default Messages;
