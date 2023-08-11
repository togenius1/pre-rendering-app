import { Fragment } from 'react';
import { GetStaticPropsContext } from 'next';
import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props: Props) {
    const { loadedProduct } = props;

    // when setting fallback to true,
    // it should be always checked if the product is undefined
    if (!loadedProduct) {
        return <p>Loading...</p>;
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(String(jsonData));

    return data;
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const { params } = context;

    const productId = params?.pid;

    const data = await getData();

    const product = data.products.find((product) => product.id === productId);

    // Should set the fallback to true to goto 404 page.
    if (!product) {
        return { notFound: true };
    }

    return {
        props: {
            loadedProduct: product,
        },
    };
}

export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map((product) => product.id);

    const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

    return {
        // paths: [
        //      { params: { pid: 'p1' } },
        //      { params: { pid: 'p2' } },
        //      { params: { pid: 'p3' } },
        // ],
        paths: pathsWithParams,

        // false: all paths pre-generated.
        // true: p1 paths pre-generated. Other paths should be loaded when visiting
        // 'blocking': Generating a page might take a bit longer worth to wait for,
        // and don't want to show an incomplete page
        fallback: true,
    };
}

export default ProductDetailPage;

//################# Type #################################
type Props = {
    loadedProduct: any;
};
