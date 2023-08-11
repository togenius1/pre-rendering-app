import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';
import { GetStaticPropsContext } from 'next';

function HomePage(props: Props) {
    const { products } = props;

    return (
        <ul>
            {products?.map((product) => (
                <li key={product.id}>
                    <Link href={`/products/${product.id}`}>{product.title}</Link>
                </li>
            ))}
        </ul>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    console.log('(Re-)Generating...');
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(String(jsonData));

    if (!data) {
        return {
            redirect: {
                destination: '/no-data',
            },
        };
    }

    if (data.products.length === 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            products: data.products,
        },
        // Greater number for static website
        //and lower numbers for dynamic website
        revalidate: 10,
    };
}

export default HomePage;

//################### Type #####################
type Props = {
    products: any[];
};
