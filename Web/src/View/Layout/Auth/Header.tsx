import { css } from "@emotion/css"
import { State } from "../../../State"
import { JSX } from "react"
import { localImage } from "../../ImageLocalSrc"
import Link from "../../Link"
import { toRoute } from "../../../Route"
import { color, font, theme } from "../../Theme"
import { emit } from "../../../Runtime/React"
import * as LoginAction from "../../../Action/Login"
import { IoMdCart, IoMdNotifications } from "react-icons/io"

type Props = { state: State }
export default function (props: Props): JSX.Element {
  const { state } = props

  return state._t === "Auth" ? (
    <div className={styles.container}>
      <Link
        route={toRoute("Home", {})}
        className={styles.logo}
      >
        <img src={localImage.logo.unwrap()} />
      </Link>
      <div className={styles.menuItems}>
        <Link
          route={toRoute("Home", {})}
          className={
            state.route._t === "Home" ? styles.menuItemActive : styles.menuItem
          }
        >
          Home
        </Link>
        <Link
          route={toRoute("Profile", {})}
          className={
            state.route._t === "Profile"
              ? styles.menuItemActive
              : styles.menuItem
          }
        >
          Profile
        </Link>
        <Link
          route={toRoute("Login", { redirect: null })}
          onClick={() => emit(LoginAction.logout())}
          className={styles.menuItem}
        >
          Logout
        </Link>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <Link
        route={toRoute("Home", {})}
        className={styles.logo}
      >
        <img src={localImage.logo.unwrap()} />
      </Link>
      <div className={styles.menuItems}>
        <div>
          <IoMdCart size={32}></IoMdCart>
        </div>
        <div>
          <IoMdNotifications size={32}></IoMdNotifications>
        </div>
        <Link
          route={toRoute("Login", { redirect: null })}
          className={styles.menuItem}
        >
          Login
        </Link>
      </div>
    </div>
  )
}

const styles = {
  container: css({
    display: "flex",
    padding: theme.s4,
    gap: theme.s4,
    justifyContent: "space-between",
    alignItems: "center",
  }),
  logo: css({
    display: "flex",
  }),
  menuItems: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  menuItem: css({
    ...font.medium14,
    color: color.secondary500,
    textDecoration: "none",
    padding: `${theme.s2} ${theme.s4}`,
    border: theme.s0,
    backgroundColor: color.transparent,
    cursor: "pointer",
  }),
  menuItemActive: css({
    ...font.medium14,
    color: color.neutral0,
    textDecoration: "none",
    padding: `${theme.s2} ${theme.s4}`,
    border: theme.s0,
    backgroundColor: color.primary500,
    cursor: "pointer",
    borderRadius: theme.br2,
  }),
}
