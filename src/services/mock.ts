import type { StreamMessage, AgentFunction } from '@/types';
import { v4 as uuid } from 'uuid';

// Agent mapping keywords for routing
export const agentMappingKeywords = {
  // JIRA Agent - Issue tracking and project management
  jiraAgent: [
    "jira", "issue", "ticket", "bug", "task", "create", "report", "broken", "error", "problem"
  ],

  // Confluence Agent - Documentation and knowledge management  
  confluenceAgent: [
    "confluence", "page", "document", "wiki", "update", "edit", "notes", "guide", "write"
  ],

  // Salesforce Agent - CRM and sales operations
  salesforceAgent: [
    "salesforce", "crm", "opportunity", "lead", "account", "sales", "customer", "soql", "query"
  ],
};

// Default AllAi Agent response when no keywords match
const createDefaultAllAiResponse = (): StreamMessage[] => [
  {
    id: uuid(),
    type: "text",
    timestamp: new Date().toISOString(),
    agent_id: "allai_agent_default",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "Hello I am AllAi agent, how can I help you today?"
  }
];

// AllAi Agent - Orchestrator handoff example
const createAllAiAgentResponse = (): StreamMessage[] => [
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    toolName: "handoff_to_agent",
    toolId: "tool_handoff_001",
    status: "in_progress",
    authenticationType: null,
    data: {
      action: "**Agent Handoff Analysis**\n\nAnalyzing request: *Create a bug report for the mobile login issue*",
      description: "Determining which specialized agent should handle this request",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Orchestrator analyzing user request"
        },
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Determined agent to hand off. "
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    toolName: "handoff_to_agent",
    toolId: "tool_handoff_001",
    status: "completed",
    authenticationType: null,
    data: {
      action: "**Agent Handoff Analysis**\n\n**Handoff Decision:**\n- ✅ Target Agent: JIRA Agent\n- ✅ Primary Task: Bug report creation",
      description: "Successfully analyzed request and prepared handoff to JIRA Agent",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Ready to transfer control to Agent"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "text",
    timestamp: new Date().toISOString(),
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "🤖",
    response_delta: "Handing off to specialist agent plese wait a bit."
  }
];

// JIRA Agent - Create issue workflow
const createJiraAgentResponse = (): StreamMessage[] => [
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    toolName: "create_issue",
    toolId: "tool_create_issue_001",
    status: "waiting_for_authentication",
    authenticationType: "jira",
    data: {
      action: "**Create JIRA Issue**\n\nIssue Type: *Bug*\nProject: *WEBAPP*",
      description: "Creating a new bug report in the WEBAPP project",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Issue creation tool call initiated"
        },
        {
          timestamp: new Date().toISOString(),
          type: "warning",
          message: "JIRA authentication required to create issue"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    toolName: "create_issue",
    toolId: "tool_create_issue_001",
    status: "waiting_user_approval",
    authenticationType: "jira",
    data: {
      action: "**Create JIRA Issue**\n\n**Issue Details:**\n- Summary: Login page crashes on mobile devices\n- Priority: High\n- Components: Frontend, Mobile",
      description: "Ready to create JIRA issue - pending user approval",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Successfully authenticated with JIRA"
        },
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Waiting for user approval to create issue"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    toolName: "create_issue",
    toolId: "tool_create_issue_001",
    status: "in_progress",
    authenticationType: "jira",
    data: {
      action: "**Create JIRA Issue**\n\n**Progress:**\n- ✅ Validated issue fields\n- 🔄 Creating issue in JIRA\n- ⏳ Setting assignee and labels",
      description: "Actively creating the JIRA issue",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "User approved - starting issue creation"
        },
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Creating issue in WEBAPP project..."
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    toolName: "create_issue",
    toolId: "tool_create_issue_001",
    status: "completed",
    authenticationType: "jira",
    data: {
      action: "**Create JIRA Issue**\n\n**Issue Created Successfully:**\n- ✅ Issue Key: WEBAPP-1247\n- ✅ Priority: High\n- ✅ Assignee: Development Team",
      description: "Successfully created JIRA issue",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "JIRA issue creation completed successfully"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "text",
    timestamp: new Date().toISOString(),
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "📋",
    response_delta: "JIRA issue created successfully! Issue key: **WEBAPP-1247**. The bug report has been assigned to the development team."
  }
];

// Confluence Agent - Modify page workflow
const createConfluenceAgentResponse = (): StreamMessage[] => [
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    toolName: "modify_page",
    toolId: "tool_modify_page_001",
    status: "waiting_for_authentication",
    authenticationType: "confluence",
    data: {
      action: "**Modify Confluence Page**\n\nUpdating page: *Product Requirements Document*",
      description: "Modifying existing Confluence page with new requirements and specifications",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Tool call initiated for page modification"
        },
        {
          timestamp: new Date().toISOString(),
          type: "warning",
          message: "Authentication required for Confluence workspace access"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    toolName: "modify_page",
    toolId: "tool_modify_page_001",
    status: "waiting_user_approval",
    authenticationType: "confluence",
    data: {
      action: "**Modify Confluence Page**\n\n**Changes to be made:**\n- Add new feature requirements section\n- Update user acceptance criteria\n- Include technical specifications",
      description: "Ready to modify Confluence page - pending user approval for the proposed changes",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Successfully authenticated with Confluence workspace"
        },
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Waiting for user approval to proceed with page modifications"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    toolName: "modify_page",
    toolId: "tool_modify_page_001",
    status: "in_progress",
    authenticationType: "confluence",
    data: {
      action: "**Modify Confluence Page**\n\n**Changes being applied:**\n- ✅ Add new feature requirements section\n- 🔄 Update user acceptance criteria\n- ⏳ Include technical specifications",
      description: "Actively modifying the Confluence page with approved changes",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "User approved changes - starting page modification"
        },
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Applying content modifications..."
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    toolName: "modify_page",
    toolId: "tool_modify_page_001",
    status: "completed",
    authenticationType: "confluence",
    data: {
      action: "**Modify Confluence Page**\n\n**Changes successfully applied:**\n- ✅ Add new feature requirements section\n- ✅ Update user acceptance criteria\n- ✅ Include technical specifications",
      description: "Successfully modified the Confluence page with all requested changes",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Page modification completed successfully"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "text",
    timestamp: new Date().toISOString(),
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "📝",
    response_delta: "Confluence page updated successfully! All changes have been applied to the Product Requirements Document."
  }
];

// Salesforce Agent - Execute SOQL query workflow
const createSalesforceAgentResponse = (): StreamMessage[] => [
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    toolName: "execute_soql_query",
    toolId: "tool_soql_001",
    status: "waiting_for_authentication",
    authenticationType: "salesforce",
    data: {
      action: "**Execute SOQL Query**\n\nQuery: *SELECT Id, Name, Amount FROM Opportunity LIMIT 5*",
      description: "Retrieving latest opportunity records from Salesforce",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "SOQL query tool call initiated"
        },
        {
          timestamp: new Date().toISOString(),
          type: "warning",
          message: "Salesforce authentication required to execute query"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    toolName: "execute_soql_query",
    toolId: "tool_soql_001",
    status: "waiting_user_approval",
    authenticationType: "salesforce",
    data: {
      action: "**Execute SOQL Query**\n\n**Query will retrieve:**\n- Opportunity ID and Name\n- Deal Amount\n- Limited to 5 most recent records",
      description: "Ready to execute SOQL query - pending user approval to access Salesforce data",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Successfully authenticated with Salesforce org"
        },
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Waiting for user approval to execute SOQL query"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    toolName: "execute_soql_query",
    toolId: "tool_soql_001",
    status: "in_progress",
    authenticationType: "salesforce",
    data: {
      action: "**Execute SOQL Query**\n\n**Status:**\n- 🔄 Executing query against Salesforce database\n- ⏳ Retrieving opportunity records",
      description: "Actively executing SOQL query to retrieve latest opportunity records",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "User approved query - starting execution"
        },
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Executing SOQL query..."
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "tool",
    timestamp: new Date().toISOString(),
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    toolName: "execute_soql_query",
    toolId: "tool_soql_001",
    status: "completed",
    authenticationType: "salesforce",
    data: {
      action: "**Execute SOQL Query**\n\n**Results:**\n- ✅ Query executed successfully\n- ✅ Retrieved 5 opportunity records\n- ✅ Data processed and formatted",
      description: "Successfully executed SOQL query and retrieved the latest opportunity records",
      logs: [
        {
          timestamp: new Date().toISOString(),
          type: "info",
          message: "Retrieved and formatted 5 opportunity records"
        }
      ]
    }
  },
  {
    id: uuid(),
    type: "text",
    timestamp: new Date().toISOString(),
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "☁️",
    response_delta: "Here are your five latest opportunity records from Salesforce: **1. Enterprise Software Deal** - Amount: $250,000 | Stage: Proposal/Price Quote"
  }
];

// Agent map for routing
export const mockAgents = {
  allAiAgent: createAllAiAgentResponse,
  jiraAgent: createJiraAgentResponse,
  confluenceAgent: createConfluenceAgentResponse,
  salesforceAgent: createSalesforceAgentResponse,
  defaultResponse: createDefaultAllAiResponse
};

// Agent router function
export const agentRouter = (userMessage: string): AgentFunction => {
  const lowercaseMessage = userMessage.toLowerCase();
  
  for (const [agentKey, keywords] of Object.entries(agentMappingKeywords)) {
    if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
      return mockAgents[agentKey as keyof typeof mockAgents];
    }
  }
  
  return mockAgents.defaultResponse;
};