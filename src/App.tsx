import "./App.css";
import mainImage from "./assets/images/main.png";
import ribbonImage from "./assets/images/ribbon.svg";
import birdImage from "./assets/images/bird.svg";
import image1 from "./assets/images/image1.png";
import image2 from "./assets/images/image2.png";
import image3 from "./assets/images/image3.png";
import image4 from "./assets/images/image4.png";
import image5 from "./assets/images/image5.png";
import image6 from "./assets/images/image6.png";
import NaverMap from "./NaverMap";
import leftArrow from "./assets/images/leftArrow.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useEffect, useRef, useState, MouseEvent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import type { Swiper as SwiperType } from "swiper";
function App() {
  const [imageList, setImageList] = useState<string[]>([]);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  // const husbandMap = useRef(null);
  // const wifeMap = useRef(null);
  const husbandRef = useRef(null);
  // const wifeRef = useRef();
  const husbandAccountList = [
    { name: "이상호", account: "010-940997-41307", bankName: "하나" },
    { name: "남영신", account: "67-910330-82107", bankName: "하나" },
    { name: "이재희", account: "308-102543-01-011", bankName: "기업" },
  ];
  const wifeAccountList = [
    { name: "성태호", account: "010-940997-41307", bankName: "하나" },
    { name: "박순(준)희", account: "67-910330-82107", bankName: "하나" },
    { name: "성정이", account: "308-102543-01-011", bankName: "기업" },
  ];

  const handleShowToggle = (e: MouseEvent<HTMLDivElement>) => {
    const bankWrapper = e.currentTarget.querySelector(".bank-wrapper");
    if (bankWrapper?.contains(e.target as Node)) return;
    e.currentTarget.classList.toggle("show");
  };

  useEffect(() => {
    setImageList([
      image1,
      image2,
      image6,
      image3,
      image4,
      image5,
      image1,
      image2,
      image3,
      image4,
      image5,
    ]);
  }, []);

  const createCalendar = (year: number, month: number, day: number) => {
    const startOffset = new Date(year, month - 1, 1).getDay();
    const lastDay = new Date(year, month, 0).getDate();
    const dayText = ["일", "월", "화", "수", "목", "금", "토"];

    return (
      <div className="flex flex-col sm:gap-4 gap-2 w-full max-w-sm sm:text-[30px] sm:leading-[36px] text-[26px] leading-[32px] text-center">
        <span className="flex">
          {dayText.map((day, index) => (
            <div
              key={index}
              className={`flex-1 ${
                day === "일" ? "text-red" : day === "토" && "text-blue"
              }`}
            >
              {day}
            </div>
          ))}
        </span>
        {/* 날짜 셀 */}
        <div className="flex flex-wrap">
          {[...Array(startOffset)].map((_, index) => (
            <div key={index}></div>
          ))}

          {[...Array(lastDay)].map((_, index) => (
            <div
              key={index + startOffset}
              className={`sm:p-2 p-1 w-[calc(100%/7)]`}
            >
              <div
                className={`w-full h-full aspect-square flex items-center justify-center ${
                  day === index + 1 && " bg-marker rounded-full text-white"
                }`}
              >
                <div className="pt-[4px]">
                  <span className="text-xl sm:text-2xl">{index + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-20 items-center w-full max-w-[750px] font-[dx-light]">
      {/* 메인 이미지 */}
      <img className="w-full" src={mainImage} />

      {/* 소개 */}
      <section className="px-[4%] flex flex-col gap-10 items-center w-full text-[#333333] sm:text-[28px] text-[19px] leading-[1.7rem]">
        <div className="flex flex-col items-center relative w-full gap-2">
          <img src={ribbonImage} />
          <h1 className="text-2xl tracking-[0.5rem]">INVITATION</h1>
          <div className="flex items-center relative w-full max-w-lg justify-center mt-2">
            <h1 className="text-[26px]">소개</h1>
            <img className="absolute right-0 w-[60px]" src={birdImage} />
          </div>
        </div>

        <div className="text-center flex flex-col gap-10">
          <span>
            <p>봄 여름 가을 겨울</p>
            <p>7번의 사계절을 지나 돌아오는 겨울,</p>
            <p>이제는 평생을 함께하려 합니다.</p>
          </span>

          <span>
            <p>지금 잡은 손을 놓지 않고,</p>
            <p>믿음과 사랑으로 함께 하겠습니다.</p>
            <p>저희 두 사람 첫 걸음을 내딛는 뜻 깊은 자리에</p>
            <p>귀한 걸음으로 축하하여 주시면</p>
            <p>더 없는 격려와 기쁨으로 간직하겠습니다.</p>
          </span>
        </div>
      </section>

      <section className="px-[10%] flex flex-col gap-10 items-center w-full text-[#333333] sm:text-[28px] text-[20px]">
        <hr className="w-full max-w-[700px] border-blue border" />
        <div className="w-full sm:text-[30px] text-[20px] flex flex-col gap-4">
          <div className="flex justify-between w-full">
            <span className="flex-1">이상호 · 남영신</span>
            <div className="flex flex-1 justify-between">
              <span className="flex-1 flex justify-center items-center leading-[normal] sm:text-[18px] text-[16px]">
                의 차남
              </span>
              <span className="flex-1 text-right">이재희</span>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <span className="flex-1">성태호 · 박순(준)희</span>
            <div className="flex flex-1 justify-between">
              <span className="flex-1 flex justify-center items-center leading-[normal] sm:text-[18px] text-[16px]">
                의 장녀
              </span>
              <span className="flex-1 text-right ">성정이</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[10%] flex flex-col items-center w-full">
        <h1 className="sm:text-[60px] text-[50px]">12</h1>
        <p className="sm:text-[30px] text-[24px] mt-3">신부측 피로연</p>
        <p className="sm:text-[30px] text-[24px] mt-3">
          2024. 12. 07. (토) 오전 11시
        </p>

        <div className="w-full flex justify-center mt-10 px-[1rem]">
          {createCalendar(2024, 12, 7)}
        </div>
        <div className="text-center flex flex-col gap-2 mt-14">
          <p className="sm:text-[30px] text-[26px]">더스타웨딩홀 예산점</p>
          <p className="sm:text-[24px] text-[18px] tracking-[-0.1rem]">
            충청남도 예산군 예산읍 벚꽃로 155번길 52-11
          </p>
        </div>
        <NaverMap x={36.696137} y={126.8310599} zoom={17} />
        <hr className="w-full max-w-[700px] border-blue border mt-[40px]" />

        <h1 className="sm:text-[60px] text-[50px]  mt-[50px]">12</h1>
        <p className="sm:text-[30px] text-[24px] mt-3">본식</p>
        <p className="sm:text-[30px] text-[24px] mt-3">
          2024. 12. 15. (일) 오후 2시
        </p>

        <div className="w-full flex justify-center mt-10 px-[1rem]">
          {createCalendar(2024, 12, 15)}
        </div>
        <div className="text-center flex flex-col gap-2 mt-14">
          <p className="sm:text-[30px] text-[26px]">
            웨딩 더 낙원, 베일리홀(2F)
          </p>
          <span className="sm:text-[24px] text-[17px] tracking-[-0.1rem]">
            <p>경기도 의정부시 시민로 65</p>
            <p>(의정부동 431-22번지) 웨딩더낙원 | 구.낙원웨딩홀</p>
          </span>
        </div>
        <NaverMap x={37.7385956} y={127.0425945} zoom={18} />
        <hr className="w-full max-w-[700px] border-blue border mt-[40px]" />
      </section>

      <section className="px-[10%] flex flex-col items-center w-full ">
        <div className="flex flex-col text-center gap-2">
          <p className="sm:text-[26px] text-[20px] tracking-[0.5rem]">
            GALLERY
          </p>
          <h1 className="sm:text-[40px] text-[30px]">웨딩 갤러리</h1>
        </div>

        <div className="flex flex-col w-full gap-2 mt-[40px]">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
              dynamicBullets: true,
            }}
            className="w-full"
            thumbs={{ swiper: thumbsSwiper }}
            navigation={true}
            modules={[Pagination, Navigation, Thumbs, FreeMode]}
          >
            {imageList.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} key={index} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full"
          >
            {imageList.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="px-[10%] w-full pb-10">
        <div className="text-center">
          <h2 className="sm:text-[26px] text-[20px] tracking-[0.5rem]">
            ACCOUNT
          </h2>
          <h1 className="sm:text-[40px] text-[30px] mt-[10px]">
            마음 전하실 곳
          </h1>

          <div className="sm:text-[25px] text-[20px] mt-8">
            <p>참석이 어려우신 분들을 위해</p>
            <p>계좌번호를 기재하였습니다.</p>
            <p>너그러운 마음으로 양해 부탁드립니다.</p>
          </div>

          <div className="flex flex-col gap-4 mt-[40px]">
            <div
              ref={husbandRef}
              className="bg-[#F4F4F4] flex flex-col transition-all "
              onClick={handleShowToggle}
            >
              <div className="flex p-8 py-6 cursor-pointer">
                <span className="flex-1 sm:text-[24px] text-[20px]">
                  신랑측 계좌번호
                </span>
                <img src={leftArrow} className="-rotate-90 flex align-center" />
              </div>
              <div className="bg-[#FFFFFF] text-lg bank-wrapper">
                {husbandAccountList.map((item) => (
                  <div className="p-4 flex flex-col gap-2" key={item.name}>
                    <div className="w-full text-left">{item.name}</div>

                    <div className="flex justify-between px-2">
                      <span>{item.bankName}</span>
                      <span>{item.account}</span>
                      <CopyToClipboard
                        text={item.account}
                        onCopy={() => {
                          alert("계좌번호가 복사되었습니다.");
                        }}
                      >
                        <span className="px-3 bg-[#F4F4F4] cursor-pointer">
                          복사
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={husbandRef}
              className="bg-[#F4F4F4] flex flex-col  transition-all "
              onClick={handleShowToggle}
            >
              <div className="flex p-8 py-6 cursor-pointer">
                <span className="flex-1 sm:text-[24px] text-[20px]">
                  신부측 계좌번호
                </span>
                <img
                  src={leftArrow}
                  className="-rotate-90  flex align-center"
                />
              </div>
              <div className="bg-[#FFFFFF] text-lg bank-wrapper">
                {wifeAccountList.map((item) => (
                  <div className="p-4 flex flex-col gap-2" key={item.name}>
                    <div className="w-full text-left">{item.name}</div>

                    <div className="flex justify-between px-2">
                      <span>{item.bankName}</span>
                      <span>{item.account}</span>
                      <CopyToClipboard
                        text={item.account}
                        onCopy={() => {
                          alert("계좌번호가 복사되었습니다.");
                        }}
                      >
                        <span className="px-3 bg-[#F4F4F4] cursor-pointer">
                          복사
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
