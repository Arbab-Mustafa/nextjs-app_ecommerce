// a function which takes Date and returns the order status according to following logic
// 1 day = dispatch, 2 days = shipped, 3-4 days = in transit, 5 or more days days = delivered 

// Solution
export function getOrderStatus(date: string): string {
    const currentDate = new Date();
    const orderDate = new Date(date);
    const diffTime = Math.abs(currentDate.getTime() - orderDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
        return "Order Placed";
    } else if (diffDays === 1) {
        return "Paid";
    } else if (diffDays === 2) {
        return "Processed";
    } else if (diffDays === 3) {
        return "Shipped";
    } else {
        return "Delivered";
    }
};