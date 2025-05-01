import React, { useEffect, useRef, memo } from 'react';
import styled from 'styled-components';

// Styled container para respetar el diseño y radio
const WidgetContainer = styled.div`
  width: 300px; // Ancho deseado
  height: 550px; // Altura del widget TradingView
  border-radius: 10px; // Aplicar border-radius
  overflow: hidden; // Asegurar que el contenido respete el radio
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); // Sombra similar a los otros elementos

  // Ajuste responsivo si es necesario
  @media (max-width: 992px) {
    width: 100%;
    // Podrías ajustar la altura aquí también si es necesario para móvil
    // height: 400px; 
  }
`;

function TradingViewWidgetComponent() {
  const container = useRef();

  useEffect(
    () => {
      // Prevenir doble renderizado del script en StrictMode o por HMR
      if (container.current && container.current.querySelector('script')) {
        return;
      }

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "colorTheme": "dark",
          "dateRange": "12M",
          "showChart": true,
          "locale": "en",
          "largeChartUrl": "",
          "isTransparent": false,
          "showSymbolLogo": true,
          "showFloatingTooltip": false,
          "width": "100%", // Ajustar a 100% para que llene el container
          "height": "100%", // Ajustar a 100% para que llene el container
          "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
          "plotLineColorFalling": "rgba(41, 98, 255, 1)",
          "gridLineColor": "rgba(42, 46, 57, 0)",
          "scaleFontColor": "rgba(219, 219, 219, 1)",
          "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
          "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
          "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
          "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
          "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
          "tabs": [
            {
              "title": "Forex",
              "symbols": [
                {
                  "s": "FX:EURUSD",
                  "d": "EUR to USD"
                },
                {
                  "s": "FX:GBPUSD",
                  "d": "GBP to USD"
                },
                {
                  "s": "FX:USDJPY",
                  "d": "USD to JPY"
                },
                {
                  "s": "FX:USDCHF",
                  "d": "USD to CHF"
                },
                {
                  "s": "FX:AUDUSD",
                  "d": "AUD to USD"
                },
                {
                  "s": "FX:USDCAD",
                  "d": "USD to CAD"
                },
                {
                  "s": "BINANCE:BTCUSDT"
                },
                {
                  "s": "BINANCE:ETHUSDT"
                }
              ],
              "originalTitle": "Forex"
            }
          ]
        }`;
      
      // Limpiar contenido previo antes de añadir (si existe)
      if (container.current) {
         while (container.current.firstChild) {
            container.current.removeChild(container.current.firstChild);
        }
         container.current.appendChild(script);
      }

      // Opcional: Limpieza si el componente se desmonta (puede no ser necesario)
      // return () => { 
      //   if (container.current && container.current.contains(script)) {
      //       container.current.removeChild(script);
      //   }
      // };
    },
    [] // Ejecutar solo una vez al montar
  );

  return (
    <WidgetContainer>
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
        {/* El copyright se puede ocultar con CSS si se desea, pero respeta los términos de TradingView */}
         <div className="tradingview-widget-copyright" style={{ display: 'none' }}> 
             <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                 <span className="blue-text">Track all markets on TradingView</span>
            </a>
         </div>
      </div>
    </WidgetContainer>
  );
}

// Usar memo para evitar re-renderizados innecesarios del widget
const TradingViewWidget = memo(TradingViewWidgetComponent);
export default TradingViewWidget; 