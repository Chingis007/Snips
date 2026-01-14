import { VideoView } from "expo-video";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { createUseStyles } from "../../lib";

import { useCardVideo } from "./hooks/useCardVideo";

export interface CardVideoProps {
  source: string;
  posterSource: string;
  isVisible?: boolean;
  autoplay?: boolean;
}

export const CardVideo = ({
  source,
  posterSource,
  isVisible,
  autoplay = false,
}: CardVideoProps) => {
  const styles = useStyles();

  const { player, showPoster, handlePress } = useCardVideo({
    source,
    isVisible,
    autoplay,
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {showPoster && (
          <Image
            source={{ uri: posterSource }}
            style={StyleSheet.absoluteFill}
          />
        )}
        {player && (
          <VideoView
            player={player}
            style={styles.video}
            contentFit="cover"
            fullscreenOptions={{
              enable: false,
            }}
            nativeControls={false}
            allowsPictureInPicture={false}
            showsTimecodes={false}
          />
        )}
        <Pressable style={styles.touchOverlay} onPress={handlePress} />
      </View>
    </View>
  );
};

CardVideo.displayName = "Card.Video";

const useStyles = createUseStyles(() => {
  return {
    wrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    video: {
      width: "100%",
      height: "100%",
    },
    touchOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "transparent",
    },
    poster: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
  };
});
