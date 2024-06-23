import { type AirConditionData } from "~/server/api/routers/airCondition/interfaces";

export const airConditionMapper = (airCondition: AirConditionData) => {
  return {
    type: airCondition.type,
    power: airCondition.power,
    option: airCondition.option,
    area: airCondition.area,
    energyType: airCondition.energyType,
    price: airCondition.price,
  };
};
