package seleniumTestPOP;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class MainPage {

	private WebDriver driver;
	private WebDriverWait wait;

	public MainPage(WebDriver driver) {
		this.driver = driver;
		this.wait = new WebDriverWait(driver, 3);
	}

	public MainPage openMainPage() {

		driver.navigate().to("http://stooq.pl/");

		return new MainPage(driver);
	}

	public void setCompany(String company) {
		WebElement input = driver.findElement(By.xpath("//*[@id='f13']"));
		input.sendKeys(company);
		input.sendKeys(Keys.RETURN);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By
				.xpath("//*[@id='q_m_1']")));
	}

	public void goTechnicalAnalysis() {
		WebElement link = driver.findElement(By.linkText("Analiza techniczna"));
		link.click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By
				.xpath("//*[@id='f13']/a[2]")));
	}

	public void downloadCsvFile() {
		WebElement link = driver.findElement(By
				.linkText("Eksportuj dane do pliku csv"));
		link.click();
	}
}
