# Mathias Keus, 013882396
# https://github.com/makeus/DSP-Ex3

require 'gchart'

class PlotController < ApplicationController
  def index
    data = (-Math::PI ... Math::PI).step(0.1).to_a.map {|x| 
      Math.sin(x)
    }
    chart = Gchart.new(
      :type => 'line',
      :size => '300x300',
      :curveType => 'function', 
      :data => data, 
      :line_colors => 'FF0000',
      :filename => "tmp/chart.png")

    chart.file

    response.headers['Cache-Control'] = "public, max-age=#{12.hours.to_i}"
    response.headers['Content-Type'] = 'image/png'
    response.headers['Content-Disposition'] = 'inline'

    render :text => open("tmp/chart.png", "rb").read
  end

  def points
    request.format = :json

    data = (-Math::PI ... Math::PI).step(0.1).to_a.map {|x| 
      [x, Math.sin(x)]
    }

    respond_to do |format|
      if !data.nil?
        format.json { render json: {result: data}}
      else
        format.json { render json: {status: 'failed'}, status: :unprocessable_entity}
      end
    end
  end
end