import { useEffect, useRef } from "react";

const NaverMap = ({ x, y, zoom }: { x: number; y: number; zoom: number }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapRef.current || !naver) return;
    // 지도 생성
    const location = new naver.maps.LatLng(x, y);
    const mapOptions = {
      center: location,
      zoom: zoom,
    };
    const map = new naver.maps.Map(mapRef.current, mapOptions);
    naver.maps.Event.addListener(map, "click", function (e) {
      console.log(e);
    });
    // 마커 생성
    new naver.maps.Marker({
      position: location,
      map: map,
    });
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", aspectRatio: "1/1" }}
      className="border border-blue border-2 border-solid max-w-[450px]"
    />
  );
};

export default NaverMap;
