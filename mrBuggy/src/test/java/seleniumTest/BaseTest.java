package seleniumTest;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.ie.*;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import seleniumTestPOP.MainPage;

public class BaseTest {

	public WebDriver driver;

	@BeforeTest
	public void setUp() {
		FirefoxProfile profile = new FirefoxProfile();

		String path = "C:\\Test\\";
		profile.setPreference("browser.download.folderList", 2);
		profile.setPreference("browser.download.dir", path);
		profile.setPreference("browser.download.manager.alertOnEXEOpen", false);
		profile.setPreference(
				"browser.helperApps.neverAsk.saveToDisk",
				"application/msword, application/csv, application/ris, text/csv, image/png, application/pdf, text/html, text/plain, application/zip, application/x-zip, application/x-zip-compressed, application/download, application/octet-stream");
		profile.setPreference("browser.download.manager.showWhenStarting", false);
		profile.setPreference("browser.download.manager.focusWhenStarting", false);
		profile.setPreference("browser.download.useDownloadDir", true);
		profile.setPreference("browser.helperApps.alwaysAsk.force", false);
		profile.setPreference("browser.download.manager.alertOnEXEOpen", false);
		profile.setPreference("browser.download.manager.closeWhenDone", true);
		profile.setPreference("browser.download.manager.showAlertOnComplete", false);
		profile.setPreference("browser.download.manager.useWindow", false);
		profile.setPreference("services.sync.prefs.sync.browser.download.manager.showWhenStarting", false);
		profile.setPreference("pdfjs.disabled", true);
		driver = new InternetExplorerDriver();
	}

	@Test
	public void TestPage() {
		MainPage mainPage = new MainPage(driver);
		mainPage.openMainPage();
		mainPage.setCompany("KGHM");
		mainPage.goTechnicalAnalysis();
		mainPage.downloadCsvFile();
	}

	@AfterTest
	public void thearDown() {
		// driver.close();
		driver.quit();
	}

}
