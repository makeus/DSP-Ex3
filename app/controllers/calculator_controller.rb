class CalculatorController < ApplicationController

  before_action :set_default_response_format, except: [:index]

  def index
  end

  def post
    result = calculate
    respond_to do |format|
      if !result.nil?
        format.json { render json: {result: result}}
      else
        format.json { render json: {status: 'failed'}, status: :unprocessable_entity}
      end
    end
  end

  private

  def calculate
    params = search_params
    return case params[:op]
      when '+' then params[:arg1] + params[:arg2]
      when '-' then params[:arg1] - params[:arg2]
      when '*' then result = params[:arg1] * params[:arg2]
      when '/' then result = params[:arg1] / params[:arg2]
    end
  end

  def search_params
    params.require(:arg1)
    params.require(:arg2)
    params.require(:op)

    params[:arg1] = params[:arg1].to_f
    params[:arg2] = params[:arg2].to_f

    return params
  end

  def set_default_response_format
    request.format = :json
  end
end