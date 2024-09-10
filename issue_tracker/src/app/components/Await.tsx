async function Await<T>(props: { promise: Promise<T>; children: (value: T) => JSX.Element }) {
    const { promise, children } = props;
    const data = await promise;
    return children(data);
}

export default Await;
