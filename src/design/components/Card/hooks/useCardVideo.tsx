import { useEventListener } from "expo";
import { useVideoPlayer } from "expo-video";
import { useCallback, useEffect, useState } from "react";

interface UseCardVideoOptions {
  source: string;
  isVisible?: boolean;
  autoplay?: boolean;
}

export function useCardVideo({
  source,
  isVisible,
  autoplay = false,
}: UseCardVideoOptions) {
  const [showPoster, setShowPoster] = useState<boolean>(true);

  const player = useVideoPlayer(source, (vPlayer) => {
    vPlayer.loop = true;
  });

  useEventListener(player, "statusChange", ({ status }) => {
    if (status === "readyToPlay") {
      setShowPoster(false);
    }
  });

  useEffect(() => {
    if (!player) {
      return;
    }

    if (isVisible) {
      if (autoplay) {
        player.play();
      }
    } else {
      player.pause();
      player.currentTime = 0;
      setShowPoster(true);
    }
  }, [isVisible, autoplay, player]);

  const handlePress = useCallback(() => {
    if (player.playing) {
      player.pause();
    } else {
      setShowPoster(false);
      player.play();
    }
  }, [player]);

  return { player, showPoster, handlePress };
}
