import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import AlertOverview from "./view/moles/AlertOverview";
import StatePanel from "./view/atoms/StatePanel";
import { getAlertMeta } from "./view/_cons/StyleConstants";
import theme from "./view/theme";
import "./i18n";

function renderWithTheme(component) {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
}

test("renders a complete current-risk overview", () => {
  const place = {
    alertLevel: 2,
    nAlerts: 2,
    nOfficialAlerts: 1,
    nAutoAlerts: 1,
    dsd: {
      latestLandslideWarningLevel: 2,
      latestLandslideWarningTimeUt: Date.now() / 1000,
      landslideAlertDataSource: {
        label: "Disaster Management Centre, Sri Lanka",
        url: "https://www.dmc.gov.lk/",
      },
    },
    autoAlertList: [{ name: "Flood", level: 1 }],
    openMeteoData: { timeUtNow: Date.now() / 1000 },
  };

  renderWithTheme(<AlertOverview place={place} />);

  expect(
    screen.getByRole("heading", { name: "2 active alerts" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Medium alert")).toBeInTheDocument();
  expect(screen.getByText("Landslide")).toBeInTheDocument();
  expect(screen.getByText("Flood")).toBeInTheDocument();
  expect(screen.getByText("Official source")).toBeInTheDocument();
});

test("offers a working retry action for failed data", () => {
  const onRetry = jest.fn();
  renderWithTheme(
    <StatePanel
      state="error"
      title="We could not load current data"
      message="Some alert services did not respond. Check your connection and try again."
      onRetry={onRetry}
    />,
  );

  fireEvent.click(screen.getByRole("button", { name: "Retry" }));
  expect(onRetry).toHaveBeenCalledTimes(1);
});

test("normalizes alert levels to the shared severity scale", () => {
  expect(getAlertMeta(0).label).toBe("No active alerts");
  expect(getAlertMeta(1).label).toBe("Low alert");
  expect(getAlertMeta(2).label).toBe("Medium alert");
  expect(getAlertMeta(3).label).toBe("High alert");
});
