let route;

export const registRoute = async (props) => {
    await new Promise((resolve, reject) => {
        route = props;
        resolve();
    })
}

export const router = () => {
    return route;
}
