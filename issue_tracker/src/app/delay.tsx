export const delay = async () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            // Replace this with your actual asynchronous operation
            const data = { message: "Data loaded successfully" };
            resolve(data);
        }, 2000); // 2 seconds delay
    });

    // Await the promise
    const result = await promise;
};
