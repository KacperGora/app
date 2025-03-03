import { EventForm } from '@types';





export type CreateEventFormProps = {
  onEventCreateRequest: () => Promise<void>;
  initialState?: EventForm;
  initialDateState: { start: string; end: string };
  currentBottomSheetIndex?: number;
};