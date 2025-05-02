import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ scannerType = 'gold' }) {
  const container = useRef();

  // Definir los símbolos para cada tipo de scanner
  const getSymbol = () => {
    switch (scannerType) {
      case 'gold':
        return 'OANDA:XAUUSD';
      case 'abi':
        return 'CMCMARKETS:EURUSD';
      case 'pops':
        return 'PEPPERSTONE:NAS100';
      default:
        return 'OANDA:XAUUSD';
    }
  };

  // Definir los intervalos para cada tipo de scanner
  const getInterval = () => {
    switch (scannerType) {
      case 'gold':
        return '5';
      case 'abi':
        return '5';
      case 'pops':
        return '5';
      default:
        return '5';
    }
  };

  // Definir los indicadores personalizados para cada tipo de scanner
  const getCustomIndicators = () => {
    switch (scannerType) {
      case 'gold':
        return [
          { id: "siK56X3D@tv-scripting-101", options: { } }
        ];
      case 'abi':
        // Puedes dejar vacío o agregar otro indicador personalizado
        return [];
      case 'pops':
        // Puedes dejar vacío o agregar otro indicador personalizado
        return [];
      default:
        return [];
    }
  };

  useEffect(() => {
    // Limpiar el contenedor anterior cuando cambia el tipo de scanner
    if (container.current) {
      while (container.current.firstChild) {
        container.current.removeChild(container.current.firstChild);
      }
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    
    // Configurar el widget con opciones para incluir el indicador personalizado
    const widgetOptions = {
      "autosize": true,
      "symbol": getSymbol(),
      "interval": getInterval(),
      "timezone": "America/Los_Angeles",
      "theme": "light",
      "style": "1",
      "locale": "es",
      "backgroundColor": "rgba(255, 255, 255, 1)",
      "hide_top_toolbar": true,
      "allow_symbol_change": false,
      "hide_volume": true,
      "support_host": "https://www.tradingview.com"
    };

    // Si hay indicadores personalizados, agregarlos a la configuración
    const customIndicators = getCustomIndicators();
    if (customIndicators && customIndicators.length > 0) {
      widgetOptions.studies = customIndicators;
    }

    script.innerHTML = JSON.stringify(widgetOptions);
    container.current.appendChild(script);
  }, [scannerType]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
  );
}

export default memo(TradingViewWidget); 