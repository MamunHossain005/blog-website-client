import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Table } from "flowbite-react";
import { Tooltip } from 'react-tooltip';
import { Helmet } from 'react-helmet-async';


const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('blogger_img', {
        header: 'Profile Photo',
        cell: ({row}) => (
            <div className='flex justify-center'>
                <img src={row.original.blogger_img} alt="Profile" className='w-10 h-10 md:w-[50px] md:h-[50px] rounded-full object-cover'/>
            </div>
        )
    }),
    columnHelper.accessor('blogger_name', {
        header: 'Blogger',
    }),
    columnHelper.accessor('title', {
        header: 'Title',
    })
];


const FeaturedBlogs = () => {
    const [sorting, setSorting] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const fetchSort = async (query) => {
        const res = await axios.get('/featuredBlogs', {
            params: {
                sort: query 
            }
        })

        return res.data;
    }
        
    const { isPending, error, data: loadedData, refetch} = useQuery({
        queryKey: ['blogs'],
        queryFn: () => fetchSort(searchParams.get("sort")),
    })

    const table = useReactTable({
        data: loadedData,
        columns,
        state: { sorting },
        manualSorting: true,
        sortDescFirst: false,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
    });

    useEffect(() => {
        if (sorting.length > 0) {
            const { id, desc } = sorting[0];
            setSearchParams({ sort: `${id}:${desc ? 'desc' : 'asc'}` });
        }
        else {
            setSearchParams(() => {
                const newParams = Object.fromEntries(searchParams);
                delete newParams.sort;

                return newParams;
            })
        }
        refetch();
    }, [sorting, searchParams]);


    if (isPending) {
        return (
            <div className='mt-36'>
                <Skeleton height={50} count={10}></Skeleton>
            </div>
        )
    }

    if (error) {
        return <h1 className="text-3xl text-center mt-36 font-bold text-red-500">Error: {error.message}</h1>
    }

    return (
        <div className='mt-36 '>
            <Helmet>
                <title>Bloggy | Featured Blogs</title>
            </Helmet>
            <div className='overflow-x-auto'>
                <Table hoverable striped>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <Table.Head key={headerGroup.id} className='md:text-2xl font-bold cursor-pointer text-center md:h-[80px]'>
                                <Table.HeadCell className='bg-green-400'>ID</Table.HeadCell>
                                {
                                    headerGroup.headers.map(header => (
                                        <Table.HeadCell key={header.id}
                                            className='bg-green-400' 
                                            onClick={header.column.getToggleSortingHandler()}>
                                            <p id='tooltip-element'>
                                                {' '}
                                                {
                                                    header.isPlaceholder
                                                        ? null
                                                        : flexRender(header.column.columnDef.header, header.getContext())
                                                }
                                                <span className="ml-2">
                                                {
                                                    { "asc": "☝️", "desc": "👇" }[header.column.getIsSorted()]
                                                }
                                                </span>
                                            </p>
                                        </Table.HeadCell>
                                    ))
                                }
                            </Table.Head>
                        ))
                    }
                    <Table.Body>
                        {
                            table.getRowModel().rows.map((row, idx) => (
                                <Table.Row key={row.id} className='text-center md:text-lg'>
                                    <Table.Cell className='md:text-lg font-medium'>{idx +  1}</Table.Cell>
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <Table.Cell key={cell.id} >
                                                {
                                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                                }
                                            </Table.Cell>
                                        ))
                                    }
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
                <Tooltip anchorSelect='#tooltip-element' content='Sort'></Tooltip>
            </div>
        </div>
    );
};

export default FeaturedBlogs;