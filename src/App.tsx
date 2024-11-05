import "./App.css";
import mainImage from "./assets/images/main.jpg";
import ribbonImage from "./assets/images/ribbon.svg";
import birdImage from "./assets/images/bird.svg";
import naver from "./assets/images/navi/naver.png";

import NaverMap from "./NaverMap";
import bottomArrow from "./assets/images/bottomArrow.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useEffect, useState, MouseEvent } from "react";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Pagination, Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import type { Swiper as SwiperType } from "swiper";
function App() {
  const imageModules = import.meta.glob("./assets/images/*.png");
  const [imageList, setImageList] = useState<string[]>([]);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const husbandAccountList = [
    { name: "이상호", account: "101642-02-113429", bankName: "우체국" },
    { name: "남영신", account: "101642-02-116396", bankName: "우체국" },
    { name: "이재희", account: "110-424-886571", bankName: "신한" },
  ];
  const wifeAccountList = [
    { name: "성태호", account: "010-940997-41307", bankName: "하나" },
    { name: "박순희", account: "67-910330-82107", bankName: "하나" },
    { name: "성정이", account: "308-102543-01-011", bankName: "기업" },
  ];

  const handleShowToggle = (e: MouseEvent<HTMLDivElement>) => {
    const bankWrapper = e.currentTarget.querySelector(".bank-wrapper");
    if (bankWrapper?.contains(e.target as Node)) return;
    e.currentTarget.classList.toggle("show");
  };

  useEffect(() => {
    const loadImages = async () => {
      const imageUrls = await Promise.all(
        Object.values(imageModules).map(async (importImage) => {
          const imported = await importImage();
          return (imported as { default: string }).default;
        })
      );

      setImageList(imageUrls);
    };

    loadImages();
  }, []);

  const createCalendar = (year: number, month: number, day: number) => {
    const startOffset = new Date(year, month - 1, 1).getDay();
    const lastDay = new Date(year, month, 0).getDate();
    const dayText = ["일", "월", "화", "수", "목", "금", "토"];

    return (
      <div className="flex flex-col  w-full max-w-sm sm:text-[30px] sm:leading-[36px] text-[26px] leading-[32px] text-center">
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
              className={`sm:p-2 p-1 w-[calc(100%/7)] font-[dx-thin]`}
            >
              <div
                className={`w-full h-full aspect-square flex items-center justify-center ${
                  day === index + 1 && " bg-marker rounded-full text-white"
                } ${
                  (index + 1) % 7 === 1 || index + 1 === 25
                    ? "text-red"
                    : (index + 1) % 7 === 0
                    ? "text-blue"
                    : ""
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
  interface CustomSwiperProps extends SwiperProps {
    preloadImages?: boolean;
  }
  return (
    <div className="flex flex-col gap-10 items-center w-full max-w-[750px] font-[dx-light]">
      {/* 메인 이미지 */}
      <img className="w-full" src={mainImage} />

      {/* 소개 */}
      <section className="px-[4%] flex flex-col gap-10 items-center w-full text-[#333333] sm:text-[24px] text-[19px] sm:leading-[2.3rem] leading-[1.7rem]">
        <div className="flex flex-col items-center relative w-full gap-2">
          <img src={ribbonImage} className="w-1/3 min-w-[200px]" />
          <h1 className="text-xl tracking-[0.5rem]">INVITATION</h1>
          <div className="flex items-center relative w-full max-w-lg justify-center mt-2">
            <h1 className="sm:text-[30px] text-[24px] font-[dx-bold] tracking-[0.1rem]">
              소중한 분들을 초대합니다
            </h1>
            <img
              className="absolute right-0 top-[90%] w-[60px]"
              src={birdImage}
            />
          </div>
        </div>

        <div className="text-center flex flex-col gap-10 font-[dx-medium]">
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
      <hr className="w-[40%] max-w-[230px] border-blue border-thin" />

      <section className="px-[10%] flex flex-col gap-10 items-center w-full text-[#333333] font-[dx-medium]">
        <div className="w-full sm:text-[30px] text-[20px] flex flex-col gap-4 items-center text-nowrap">
          <div className="flex justify-between w-full max-w-[500px]">
            <span className="flex-1">이상호 · 남영신</span>
            <div className="flex flex-1 justify-between">
              <span className="flex-1 flex justify-center items-center leading-[normal] sm:text-[18px] text-[16px] font-[dx-light]">
                의 차남
              </span>
              <span>이재희</span>
            </div>
          </div>
          <div className="flex justify-between w-full max-w-[500px]">
            <span className="flex-1">성태호 · 박순(준)희</span>
            <div className="flex flex-1 justify-between">
              <span className="flex-1 flex justify-center items-center leading-[normal] sm:text-[18px] text-[16px] font-[dx-light]">
                의 장녀
              </span>
              <span>성정이</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[10%] flex flex-col items-center w-full mt-20">
        <p className="sm:text-[60px] text-[50px] leading-[normal]">12</p>
        <div className="flex flex-col items-center w-full gap-2">
          <p className="sm:text-[30px] text-[24px] font-[dx-bold]">
            신부측 피로연
          </p>
          <p className="sm:text-[24px] text-[18px] font-[dx-thin]">
            2024년 12월 07일 (토) 오전 11시
          </p>
          <hr className="w-full border-blue border-thin max-w-[26rem]" />
        </div>

        <div className="w-full flex justify-center my-6 px-[1rem]">
          {createCalendar(2024, 12, 7)}
        </div>
        <hr className="w-full  border-blue border-thin max-w-[26rem]" />

        <div className="text-center flex flex-col gap-2 mt-14">
          <h1 className="text-xl tracking-[0.3rem]">LOCATION</h1>
          <h1 className="text-[28px] font-[dx-bold]">오시는 길</h1>
          <p className="text-[22px] font-[dx-medium] mt-10">
            더스타웨딩홀 예산점
          </p>
          <p className="sm:text-[18px] text-[17px] tracking-[-0.1rem] font-[dx-thin] opacity-[0.5]">
            충청남도 예산군 예산읍 벚꽃로 155번길 52-11
          </p>
          <p className="sm:text-[18px] text-[17px] tracking-[-0.1rem] font-[dx-thin] opacity-[0.5]">
            Tel. 041-334-3331
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center w-full mt-[-2rem]">
        <NaverMap x={36.696137} y={126.8310599} zoom={17} />
      </section>
      <section className="px-[10%] flex flex-col items-center w-full ">
        <div className="w-full flex">
          <a
            href="https://map.naver.com/p/entry/place/36928942?placePath=%2Fhome"
            className="p-3 border border-solid border-[#ededed] bg-white rounded-xl flex-1"
          >
            <div className="flex items-center gap-2 w-full justify-center">
              <img src={naver} className="w-[24px]" />
              <span className="pt-[4px]">네이버 지도</span>
            </div>
          </a>
        </div>

        <span className="w-full flex flex-col gap-4 sm:text-[20px] text-[16px] font-[dx-medium] mt-[20px]">
          <hr className="w-full max-w-[700px] border-blue border-thin " />
          <div className="flex flex-col gap-2 trans">
            <span>고속·시외버스</span>
            <p className="opacity-[0.6]">
              예산 종합버스터미널 하차 후 도보 300M 거리
            </p>
          </div>
          <hr className="w-full max-w-[700px] border-blue border-thin " />
          <div className="flex flex-col gap-2 trans">
            <span>기차·예산역</span>
            <p className="opacity-[0.6]">
              장항선(용산-장항-익산) 예산역 하차 후<br /> 택시 5분 거리
            </p>
          </div>
          <hr className="w-full max-w-[700px] border-blue border-thin" />
        </span>
      </section>
      <section className="px-[10%] flex flex-col items-center w-full mt-20">
        <p className="sm:text-[60px] text-[50px] leading-[normal]">12</p>
        <div className="flex flex-col items-center w-full gap-2">
          <p className="sm:text-[30px] text-[24px] font-[dx-bold]">본식</p>
          <p className="sm:text-[24px] text-[18px] font-[dx-thin]">
            2024년 12월 15일 (일) 오후 2시
          </p>
          <hr className="w-full border-blue border-thin max-w-[26rem]" />
        </div>

        <div className="w-full flex justify-center my-6 px-[1rem]">
          {createCalendar(2024, 12, 15)}
        </div>
        <hr className="w-full  border-blue border-thin max-w-[26rem]" />
        <div className="text-center flex flex-col gap-2 mt-14">
          <h1 className="text-xl tracking-[0.3rem]">LOCATION</h1>
          <h1 className="text-[28px] font-[dx-bold]">오시는 길</h1>

          <span className="mt-10">
            <p className="text-[22px] font-[dx-medium] ">
              웨딩 더 낙원, 베일리홀(2F)
            </p>
            <p className="sm:text-[18px] text-[17px] tracking-[-0.1rem] font-[dx-thin] opacity-[0.5]">
              경기도 의정부시 시민로 65
            </p>
            <p className="sm:text-[18px] text-[17px] tracking-[-0.1rem] font-[dx-thin] opacity-[0.5]">
              (의정부동 431-22번지) 웨딩더낙원 | 구.낙원웨딩홀
            </p>
          </span>
          <p className="sm:text-[18px] text-[17px] tracking-[-0.1rem] font-[dx-thin] opacity-[0.5]">
            Tel. 031-871-7000
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center w-full mt-[-2rem]">
        <NaverMap x={37.7385956} y={127.0425945} zoom={18} />
      </section>
      <section className="px-[10%] flex flex-col items-center w-full ">
        <div className="w-full flex">
          <a
            href="https://map.naver.com/p/entry/place/12185062?placePath=%2Fhome&c=15.00,0,0,0,dh"
            className="p-3 border border-solid border-[#ededed] bg-white rounded-xl flex-1"
          >
            <div className="flex items-center gap-2 w-full justify-center">
              <img src={naver} className="w-[24px]" />
              <span className="pt-[4px]">네이버 지도</span>
            </div>
          </a>
        </div>

        <span className="w-full flex flex-col gap-4 sm:text-[20px] text-[16px] font-[dx-medium] mt-[20px]">
          <hr className="w-full max-w-[700px] border-blue border-thin " />
          <div className="flex flex-col gap-1 trans">
            <span>버스</span>
            <p className="opacity-[0.6]">
              <span>의정부역,서부광장 정류장 [08-084]</span>
            </p>
            <p className="opacity-[0.6]">시내버스 : 3번 (낙원 앞 하차)</p>
            <p className="opacity-[0.6]">
              마을버스 : 202, 202-1, 206, 207, 207-1 (낙원 앞 하차)
            </p>
            <p className="opacity-[0.6]">서울 : 106-1, 108 (의정부역 하차)</p>
          </div>
          <hr className="w-full max-w-[700px] border-blue border-thin " />
          <div className="flex flex-col gap-2 trans">
            <span>지하철</span>
            <p className="opacity-[0.6]">지하철 1호선</p>
            <p className="opacity-[0.6]">의정부역 1호선 의정부역 3번 출구</p>
            <p className="opacity-[0.6]">
              시청방향 200M <br />
              (첫 신호등 건너 우측 2번째 건물)
            </p>
          </div>
          <hr className="w-full max-w-[700px] border-blue border-thin" />
        </span>
      </section>

      <section className="px-[10%] flex flex-col items-center w-full mt-20">
        <div className="flex flex-col text-center gap-2 font-[dx-bold]">
          <p className="sm:text-[26px] text-[20px] tracking-[0.5rem] ">
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
            {...({ preloadimages: "true" } as CustomSwiperProps)}
            lazyPreloadPrevNext={5}
          >
            {imageList.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} loading="eager" />
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
            {...({ preloadimages: "true" } as CustomSwiperProps)}
            lazyPreloadPrevNext={5}
          >
            {imageList.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} loading="eager" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="px-[10%] w-full pb-10 mt-20">
        <div className="text-center font-[dx-bold]">
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
              className="bg-[#F4F4F4] flex flex-col transition-all "
              onClick={handleShowToggle}
            >
              <div className="flex p-8 py-6 cursor-pointer bg-[#b7dcff] rounded-xl bank-button">
                <span className="flex-1 sm:text-[24px] text-[20px] ">
                  신랑측 계좌번호
                </span>
                <img
                  src={bottomArrow}
                  className="flex align-center w-[30px] arrow"
                />
              </div>
              <div className="bg-[#FFFFFF] text-lg bank-wrapper">
                {husbandAccountList.map((item) => (
                  <div className="p-3 flex flex-col " key={item.name}>
                    <div className="w-full text-left">{item.name}</div>

                    <div className="flex justify-between px-2 font-[dx-light]">
                      <span className="pt-2">{item.bankName}</span>
                      <span className="pt-2">{item.account}</span>
                      <CopyToClipboard
                        text={item.account}
                        onCopy={() => {
                          alert("계좌번호가 복사되었습니다.");
                        }}
                      >
                        <span className="px-3 text-[16px] pt-[6px] bg-[#F3F3F3] cursor-pointer rounded font-[dx-medium]">
                          복사
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="bg-[#F4F4F4] flex flex-col transition-all "
              onClick={handleShowToggle}
            >
              <div className="flex p-8 py-6 cursor-pointer bg-[#b7dcff] rounded-xl bank-button">
                <span className="flex-1 sm:text-[24px] text-[20px] ">
                  신부측 계좌번호
                </span>
                <img
                  src={bottomArrow}
                  className="flex align-center w-[30px] arrow"
                />
              </div>
              <div className="bg-[#FFFFFF] text-lg bank-wrapper">
                {wifeAccountList.map((item) => (
                  <div className="p-3 flex flex-col " key={item.name}>
                    <div className="w-full text-left">{item.name}</div>

                    <div className="flex justify-between px-2 font-[dx-light]">
                      <span className="pt-2">{item.bankName}</span>
                      <span className="pt-2">{item.account}</span>
                      <CopyToClipboard
                        text={item.account}
                        onCopy={() => {
                          alert("계좌번호가 복사되었습니다.");
                        }}
                      >
                        <span className="px-3 text-[16px]  pt-[6px] bg-[#F4F4F4] cursor-pointer rounded">
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
