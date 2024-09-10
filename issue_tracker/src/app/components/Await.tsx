async function Await(props: any) {
    const { promise, children } = props;
    await promise;
    return children;
}

export default Await;
