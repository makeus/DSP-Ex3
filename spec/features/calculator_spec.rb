require "rails_helper"

describe "calculator page" do
  it "should calculate the example properly", :js => true do
    visit root_path
    fill_in("input", with: "1 + 2 * 3 / 4")
    click_button("Go")
    expect(page).to have_content "1 + 2 = 3"
    expect(page).to have_content "3 * 3 = 9"
    expect(page).to have_content "9 / 4 = 2.25"
  end

  it "should accept sin(x) as search and show 3 graps", :js => true do
    visit root_path
    fill_in("input", with: "sin(x)")
    click_button("Go")
    expect(page).to have_css("img[src*='/plot']")
    expect(page).to have_css("canvas")
  end

  it "simplify should simplify using previous results", :js => true do
    visit root_path
    fill_in("input", with: "1 + 2 * 3 / 4")
    click_button("Go");
    fill_in("input", with: "1 + 2 * 3 / 4")
    click_link("simplify")
    expect(find_field("input").value).to eq "2.25"
  end
end