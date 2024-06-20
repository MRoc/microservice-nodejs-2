import axios from "axios";
import { useState } from "react";

export interface ErrorResponse {
  message: string;
  field?: string;
}

export default function useRequest({
  url,
  method,
  body,
  onSuccess,
}: {
  url: string;
  method: "post" | "get" | "put" | "delete";
  body: any;
  onSuccess?: (data: any) => void;
}) {
  const [errors, setErrors] = useState<JSX.Element | null>(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props});

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errors = err?.response?.data as ErrorResponse[];

        setErrors(
          <div>
            <ul>
              {errors.map((error) => (
                <li key={error.message}>
                  {error.message}
                </li>
              ))}
            </ul>
          </div>
        );
      } else {
        throw err;
      }
    }
  };

  return { doRequest, errors };
}
