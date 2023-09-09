import Joi from "joi";

export const CreateOrUpdatePrayerFormSchema =
  Joi.object<ICreateOrUpdateUserForm>({
    name: Joi.string(),
    email: Joi.string().email({ tlds: { allow: false } }),
  });
