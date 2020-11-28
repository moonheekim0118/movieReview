import React, { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '../../atoms/Icons';
import { 
    faChevronCircleLeft, 
    faChevronCircleRight,
    faTimes, 
    } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { MovieList } from '../../model/MovieList';

interface Props {
    movieLists?:Array<MovieList>;
    editMode?:boolean;
}
const Slider=({movieLists,editMode=false} : Props)=>{
    const [ TOTAL_SLIDES, setTotalSlides ] = useState(2);
    const [ currentSlide, setCurrentSlide ] = useState(0);
    const slideRef = useRef(null);
    
    useEffect(()=>{
        const onResize=()=>{
            if(window.innerWidth<=768){
                setTotalSlides(movieLists.length/2);
            }
            else{
                setTotalSlides(movieLists.length/5);
            }
        };
        onResize(); // 최초 TOTAL_SLIDES 정하기 
        window.addEventListener('resize', onResize); // 화면 크기 바뀔 때 TOTAL_SLIDES 변경 
        return ()=>{
            window.removeEventListener('resize',onResize);
        }
    },[]);

    useEffect(()=>{ // 슬라이드 움직였을 경우 화면 움직여주기 
        slideRef.current.style.transition="transform 0.5s ease-in-out";
        slideRef.current.style.transform =`translateX(-${currentSlide}00%)`;
    },[currentSlide]);


    const nextSlide = useCallback(()=>{ // 다음 슬라이드 보여주기 버튼 
        if(currentSlide >=TOTAL_SLIDES){
            setCurrentSlide(0);
        }
        else{
            setCurrentSlide(currentSlide+1);
        }
    },[currentSlide]);

    const prevSlide = useCallback(() => { // 이전 슬라이드 보여주기 버튼 
        if(currentSlide === 0){
            setCurrentSlide(TOTAL_SLIDES);
        }
        else{
            setCurrentSlide(currentSlide-1);
        }
    },[currentSlide]);

    return(
        <Container>
            <SliderContainer ref={slideRef}>
                {movieLists.map((v,i)=>
                <Slide key={v.image}>
                    <IMG src={v.image}/>
                    <MovieTitle>{v.title}</MovieTitle>
                    <CloseButton>
                        <Icon icon={faTimes}
                        onClick={prevSlide}
                        color="red"
                        size={30}
                        />
                    </CloseButton>
                </Slide>)}
            </SliderContainer>
            <MoveButton direction="left">
                <Icon icon={faChevronCircleLeft}
                onClick={prevSlide}   
                size={50}     
                color="lightPurple"
                />
            </MoveButton>
            <MoveButton direction="right">
                <Icon icon={faChevronCircleRight}
                onClick={nextSlide}
                size={50}
                color="lightPurple"
                />
            </MoveButton>
        </Container>
    );
}

const Container = styled.div`
    width:100%;
    overflow:hidden;
    position:relative;
`;

const SliderContainer = styled.div`
    width:80%;
    display:flex;
    padding:30px;
`;

const Slide = styled.div`
    display:flex;
    flex-direction:column;
    position:relative;
    padding:20px;
`;

const IMG = styled.img`
    height:170px;
`;

const MovieTitle=styled.div`
    margin-top:10px;
    font-weight:bold;
`;

const CloseButton = styled.div`
    position:absolute;
    top:30px;
    right:30px;
    border-radius:50%;
    width:30px;
    height:30px;
    text-align:center;

    transition: 0.2s background-color ease-in-out;

    &:hover{
        background-color:rgba(255,255,255,0.5);
    }
`;

const MoveButton = styled.div<{direction:string}>`
    position:absolute;
    left:${(props)=>props.direction==='left'?'0':''};
    right:${(props)=>props.direction==='right'?'0':''};
    top:50%;
    transform:translateY(-50%);
    z-index:100;
`;

export default Slider;