import React from 'react';
import { useParams } from 'react-router-dom';
import TableCategory from '../components/table-category';
import Layout from '../components/layout';

const Table = () => {
    const { category } = useParams();
    return (
        <>
        <Layout>
            <TableCategory categoryName={category}/>
        </Layout>
        </>
    )
}

export default Table;