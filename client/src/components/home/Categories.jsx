import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { categories } from '../constants/data'

const StyledTable = styled(Table)`
border:1px solid rgba(224,224,224,1)   
`
const StyledButton = styled(Button)`
margin :20px;
width:85%;
background:#6495ED;
color:#FFFFFF ;
text-decoration:none  
`

const StyledLink = styled(Link)`
text-decoration:none;
color:inherit;
`

export const Categories = () => {

    const [searchParam] = useSearchParams()
    const category = searchParam.get('category')
    return (
        <>
            <StyledLink to={`/create?category=${ category || ''}`}>
                <StyledButton variant='contained'>Create Blog</StyledButton>
            </StyledLink>

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to="/">
                            All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => {
                            return (<TableRow key={category.id}>
                                <TableCell>
                                    <StyledLink to={`/?category=${category.type}`}>
                                        {category.type}
                                    </StyledLink>
                                </TableCell>
                            </TableRow>
                            )
                        })
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}
