import './App.css';
import GameView from './views/GameView';
import { I18nProvider } from './i18n/I18nContext';
import LanguageSelector from './components/LanguageSelector';

function App() {
  // 设置游戏板尺寸，15列和20行
  const BOARD_WIDTH = 15;
  const BOARD_HEIGHT = 20;

  return (
    <I18nProvider>
      <div className="app-container">
        <LanguageSelector />
        <GameView width={BOARD_WIDTH} height={BOARD_HEIGHT} />
      </div>
    </I18nProvider>
  );
}

export default App;
