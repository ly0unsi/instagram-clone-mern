import { Modal, useMantineTheme } from "@mantine/core";
import useDarkMode from "../../Utils/UseDark";
import PostShare from "../PostShare/PostShare";

function ShareModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  const [colorTheme, settheme] = useDarkMode()

  return (
    <Modal
      overlayColor={
        colorTheme !== "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <PostShare />
    </Modal>
  );
}

export default ShareModal;