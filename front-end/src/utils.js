import React from "react";
import { MdAccountBalance, MdEco, MdFace, MdFavorite } from "react-icons/md";
import {
  MdRedeem,
  MdTipsAndUpdates,
  MdPlayCircle,
  MdBusiness,
  MdListAlt,
} from "react-icons/md";
import { MdInventory, MdModeEdit, MdCloudQueue } from "react-icons/md";
import {
  MdOutlineLocalGroceryStore,
  MdEmojiTransportation,
  MdOutlineLocalCafe,
} from "react-icons/md";
import {
  MdOutlineCastForEducation,
  MdOutlineSportsHandball,
} from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import {
  FaUtensils,
  FaMoneyBillWave,
  FaShoppingCart,
  FaCarAlt,
  FaPlane,
  FaCocktail,
  FaLaughSquint,
} from "react-icons/fa";

export const styles = {
  muiButton: "MuiButton-root",
  marginBottom: "margin-bottom-16",
  centerContent: "center-content",
  flowDown: "flow-down",
  wrapContent: "wrap-content",
  fillSpace: "fill-space",
};

export const iconNameToComponent = {
  FaUtensils,
  FaMoneyBillWave,
  FaShoppingCart,
  FaCarAlt,
  FaPlane,
  FaCocktail,
  FaLaughSquint,
  MdAccountBalance,
  MdEco,
  MdFace,
  MdFavorite,
  MdRedeem,
  MdTipsAndUpdates,
  MdPlayCircle,
  MdBusiness,
  MdListAlt,
  MdInventory,
  MdModeEdit,
  MdCloudQueue,
  MdOutlineLocalGroceryStore,
  MdEmojiTransportation,
  MdOutlineLocalCafe,
  MdOutlineCastForEducation,
  MdOutlineSportsHandball,
  AiOutlineHome,
};

export const timeout = async (ms) => {
  return new Promise((resolve) => setTimeout(() => resolve(undefined), ms));
};

export const keyBy = (arr, mapper = (v) => v) => {
  const output = {};
  arr.forEach((v) => (output[mapper(v)] = v));
  return output;
};

export const pick = (obj, keys) => {
  const output = {};
  keys.forEach((k) => (output[k] = obj[k]));
  return output;
};

export const mapKeys = (obj, mapper) => {
  const output = {};
  Object.entries(obj).forEach(([key, value]) => (output[mapper(key)] = value));
  return output;
};

export const mapValues = (obj, mapper) => {
  const output = {};
  Object.entries(obj).forEach(([key, value]) => (output[key] = mapper(value)));
  return output;
};

export function useAsync(_call, dependencies) {
  const counter = React.useRef(0);
  const data = React.useRef(undefined);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const call = React.useCallback(_call, dependencies);

  React.useEffect(() => {
    setIsLoaded(false);
    counter.current += 1;
    const iteration = counter.current;

    const doCall = async () => {
      let newValue, newIsLoaded;
      try {
        newValue = await new Promise((resolve) => resolve(call()));
        newIsLoaded = true;
      } catch (err) {
        newValue = undefined;
        newIsLoaded = false;
      }

      if (iteration === counter.current) {
        data.current = newValue;
        setIsLoaded(newIsLoaded);
      }
    };

    doCall();
  }, [call, setIsLoaded]);

  return { isLoaded, data: data.current };
}
