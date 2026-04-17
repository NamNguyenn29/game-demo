"use client";
import { useState, useCallback } from "react";
import type { GameState } from "@/types/game";
import LoadingScreen from "@/components/game/LoadingScreen";
import StartMenu from "@/components/game/StartMenu";
import GameCanvas from "@/components/game/GameCanvas";
import NoteModal from "@/components/game/NoteModal";
import SecretModal from "@/components/game/SecretModal";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("loading");
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);
  const [secretVisible, setSecretVisible] = useState(false);

  const handleLoadComplete = useCallback(() => setGameState("menu"), []);
  const handleStart = useCallback(() => setGameState("playing"), []);

  const handleOpenNote = useCallback((id: string) => {
    setOpenNoteId(id);
    setGameState("note");
  }, []);

  const handleCloseNote = useCallback(() => {
    setOpenNoteId(null);
    setGameState("playing");
  }, []);

  const handleReachSecret = useCallback(() => {
    setSecretVisible(true);
    setGameState("secret");
  }, []);

  const handleCloseSecret = useCallback(() => {
    setSecretVisible(false);
    setGameState("playing");
  }, []);

  const isGameActive = gameState === "playing" || gameState === "note" || gameState === "secret";

  return (
    <main className="fixed inset-0 overflow-hidden">
      {gameState === "loading" && <LoadingScreen onComplete={handleLoadComplete} />}
      {isGameActive && (
        <GameCanvas
          gameState={gameState}
          onOpenNote={handleOpenNote}
          onReachSecret={handleReachSecret}
        />
      )}
      {gameState === "menu" && <StartMenu onStart={handleStart} />}
      <NoteModal noteId={openNoteId} onClose={handleCloseNote} />
      <SecretModal visible={secretVisible} onClose={handleCloseSecret} />
    </main>
  );
}
