import {
  ChangeEvent,
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import NoAddressResult from "@/components/no-address-result";
import { Input } from "./text-input";

interface autocompleteResult {
  description: string;
  matched_substrings: [
    {
      length: number;
      offset: number;
    }
  ];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
    secondary_text: string;
  };
  terms: {
    offset: number;
    value: string;
  }[];
  types: string[];
}
interface coords {
  latitude: number;
  longitude: number;
}
export interface AutocompleteProps extends ComponentProps<typeof Input> {
  value?: string;
  onPlaceChanged: (place: string) => void;
  setCoordinates?: (coords: coords) => void;
  applyTheme?: boolean;
}

export const AutocompleteInput = ({
  onPlaceChanged,
  setCoordinates,
  value,
  applyTheme = true,
}: AutocompleteProps) => {
  const ref = useRef(null) as any;

  const [loading, setLoading] = useState(false);
  const [isMenuDocked, setIsMenuDocked] = useState(true);
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState<autocompleteResult[]>([]);
  // logic to close referenced container when clicked outsite the element
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (ref?.current && !ref?.current?.contains(event.target)) {
      setIsMenuDocked(true);
    }
  };

  useEffect(() => {
    setKeywords(value || "");
  }, [value]);

  const handleAutocomplete = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setKeywords(value);
      setLoading(true);
      try {
        // ALERT: Internal API call!
        const response = await axios.get(
          `/api/maps/autocomplete?input=${value}`
        );
        const data = response?.data?.data;
        setResult(data);
        setIsMenuDocked(false);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const onLocationClick = useCallback(
    async (location: string, placeId: string) => {
      setLoading(true);
      try {
        // ALERT: Internal API call!
        const geometryResponse = await axios.get(
          `/api/maps/place-geometry?placeId=${placeId}`
        );
        const { lat, lng } = geometryResponse?.data?.data;
        setCoordinates?.({
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
      } finally {
        setIsMenuDocked(true);
        setLoading(false);
      }
      onPlaceChanged(location);
      setKeywords(location);
    },
    []
  );

  return (
    <div className=" w-full relative" ref={ref}>
      <div className="relative w-full">
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <Loader2 className="custom-spin h-4 w-4 text-primary" />
          </div>
        )}
        <Input
          value={keywords}
          onChange={(e) => handleAutocomplete(e)}
          placeholder="Select Location"
          applyTheme={applyTheme}
        />
      </div>
      {!isMenuDocked && (
        <div className="w-full border-primary-dull z-10 absolute top-10 left-0 dark:bg-dark-ash-500 bg-white shadow-md rounded-md">
          <div className=" flex flex-col gap-1 max-h-64 overflow-auto">
            {result?.length > 0 ? (
              result.map((location) => (
                <button
                  type="button"
                  key={location?.place_id}
                  onClick={() =>
                    onLocationClick(location?.description, location?.place_id)
                  }
                  className=" hover:bg-primary/15 hover:border p-1 px-3 transition-all text-left py-1 border-b border-primary hover:px-3 text-sm"
                >
                  {location?.description}
                </button>
              ))
            ) : (
              <NoAddressResult />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
