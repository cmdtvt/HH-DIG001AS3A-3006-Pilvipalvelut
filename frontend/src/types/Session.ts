
// import type { Player } from "./Player";

export type SessionStatus = "waiting" | "playing" | "finished";

export type Session = {
    id: string;
    sessionName: string;
    scores: Record<string, number>; // playerId -> score
    currentRound: number;
    currentGame?: string;
    status: SessionStatus;
    createdAt: unknown;
    createdBy: unknown;
    lastActivity?: unknown;
};