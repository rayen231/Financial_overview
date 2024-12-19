import os
import sys
from crewai import Agent, Task, Crew, Process

def chat_with_stocks( portfolio_info,query,market_data):
    # Define the Financial Expert Agent
    if not portfolio_info:
        portfolio_info = "No user info "
    financial_expert = Agent(
        role="Financial Expert",
        goal="To assist users in understanding their portfolio performance and providing insights based on the latest stock market data.",
        backstory=(
            "As a seasoned Financial Analyst, I specialize in analyzing market trends, "
            "evaluating portfolio performance, and offering personalized financial advice. "
            "I stay updated with real-time market data to provide accurate and relevant insights."
        ),
        verbose=True,
        allow_delegation=False
    )

    # Format the input to include stock market data and the user's portfolio info
    input_analysis = (
        f"Market Data: {market_data}\n"
        f"User Portfolio: {portfolio_info}"
    )

    # Define the task for the agent
    financial_task = Task(
        description=(
         f""""
         Analyze the user query to provide detailed financial insights based on their portfolio and the latest stock market trends.
         {query}
         {portfolio_info}
         """
        ),
        agent=financial_expert,
        expected_output=(
            "After analyzing your portfolio and the latest stock market trends, "
            "I can provide the following insights: ..."
        )
    )

    # Create a Crew with the Financial Expert agent and task
    crew = Crew(
        agents=[financial_expert],
        tasks=[financial_task],
        verbose=1,
        process=Process.sequential,
        Output_Log_File=True
    )

    # Execute the crew's task
    output = crew.kickoff()
    return output  # Return the detailed financial insights

#print(chat_with_stocks(portfolio_info=walet_info(1),query="is google a good stock to buy?"))

