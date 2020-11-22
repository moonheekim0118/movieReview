import React ,{ useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router'
import Icons from '../../atoms/Icons';
import styled from 'styled-components';
import { faChevronLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import Logout from '../User/Logout';

interface Props {
    PageName?:string;
    children?:any;
}

const Layout=({ PageName="" , children} : Props)=>{
    
    const onPushBack = useCallback(()=>{
        Router.back();
    },[]);

    const MainButton = PageName ==='메뉴' ? <Logout/> : <Link href="/menu"><a><Icons icon={faBars} color="lightPurple"/></a></Link> ;
    
    return(
        <App>
        {PageName &&         
        <Header>
            <div><Icons icon={faChevronLeft} className={"fa-chevron-left"} onClick={onPushBack}/></div>
            <PageInfo>
                <PageDescription>{PageName}</PageDescription>
                {MainButton}
            </PageInfo>
        </Header>}
        {children}
        </App>
    );
}

const App = styled.div`
    min-height: 100vh;
    width:767px;
    margin:auto;
    position:relative;
    
    background-color:#FFF;

    @media screen and (max-width:414px){
        width: 100%;
    };

    @media screen and (max-width:768px){
        width: 375px;
    };

`;
const Header = styled.header`
    display:flex;
    justify-content:space-between;
    align-items:center;

    width: 100%;
    height: 50px;
    padding:0px 20px;

    position:sticky;
    top: 0;  
    
    color:#cc00cc;
    border-bottom:1px solid #e6b3cc;
    background-color:inherit;

    z-index:2000;
    
`;

const PageInfo = styled.div`
    width:200px;
    max-width:80%;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
`;

const PageDescription = styled.div`
    padding-left:20px;
`;

export default Layout;