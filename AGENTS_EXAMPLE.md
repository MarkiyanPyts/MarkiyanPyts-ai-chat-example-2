// Example stream messages array for Confluence Agent response
// Shows complete lifecycle: auth pending -> user approval -> in progress -> completed -> text confirmation

const confluenceAgent: StreamMessage[] = [
  // 1. Tool call initiated - waiting for authentication
  {
    id: "msg_001",
    type: "tool",
    timestamp: "2025-07-04T14:30:00.000Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    toolName: "modify_page",
    toolId: "tool_modify_page_001",
    status: "waiting_for_authentication",
    authenticationType: "confluence",
    data: {
      action: "**Modify Confluence Page**\n\nUpdating page: *Product Requirements Document*",
      description: "Modifying existing Confluence page with new requirements and specifications",
      logs: [
        {
          timestamp: "2025-07-04T14:30:00.000Z",
          type: "info",
          message: "Tool call initiated for page modification"
        },
        {
          timestamp: "2025-07-04T14:30:01.000Z",
          type: "warning",
          message: "Authentication required for Confluence workspace access"
        }
      ]
    }
  },

  // 2. Authentication completed, waiting for user approval
  {
    id: "msg_002",
    type: "tool",
    timestamp: "2025-07-04T14:30:15.000Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    toolName: "modify_page",
    toolId: "tool_modify_page_001",
    status: "waiting_user_approval",
    authenticationType: "confluence",
    data: {
      action: "**Modify Confluence Page**\n\nUpdating page: *Product Requirements Document*\n\n**Changes to be made:**\n- Add new feature requirements section\n- Update user acceptance criteria\n- Include technical specifications\n- Add timeline and milestones",
      description: "Ready to modify Confluence page - pending user approval for the proposed changes",
      logs: [
        {
          timestamp: "2025-07-04T14:30:00.000Z",
          type: "info",
          message: "Tool call initiated for page modification"
        },
        {
          timestamp: "2025-07-04T14:30:01.000Z",
          type: "warning",
          message: "Authentication required for Confluence workspace access"
        },
        {
          timestamp: "2025-07-04T14:30:15.000Z",
          type: "info",
          message: "Successfully authenticated with Confluence workspace"
        },
        {
          timestamp: "2025-07-04T14:30:16.000Z",
          type: "info",
          message: "Waiting for user approval to proceed with page modifications"
        }
      ]
    }
  },

  // 3. User approved, tool execution in progress
  {
    id: "msg_003",
    type: "tool",
    timestamp: "2025-07-04T14:31:30.000Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    toolName: "modify_page",
    toolId: "tool_modify_page_001",
    status: "in_progress",
    authenticationType: "confluence",
    data: {
      action: "**Modify Confluence Page**\n\nUpdating page: *Product Requirements Document*\n\n**Changes being applied:**\n- ✅ Add new feature requirements section\n- 🔄 Update user acceptance criteria\n- ⏳ Include technical specifications\n- ⏳ Add timeline and milestones",
      description: "Actively modifying the Confluence page with approved changes",
      logs: [
        {
          timestamp: "2025-07-04T14:30:00.000Z",
          type: "info",
          message: "Tool call initiated for page modification"
        },
        {
          timestamp: "2025-07-04T14:30:01.000Z",
          type: "warning",
          message: "Authentication required for Confluence workspace access"
        },
        {
          timestamp: "2025-07-04T14:30:15.000Z",
          type: "info",
          message: "Successfully authenticated with Confluence workspace"
        },
        {
          timestamp: "2025-07-04T14:30:16.000Z",
          type: "info",
          message: "Waiting for user approval to proceed with page modifications"
        },
        {
          timestamp: "2025-07-04T14:31:30.000Z",
          type: "info",
          message: "User approved changes - starting page modification"
        },
        {
          timestamp: "2025-07-04T14:31:32.000Z",
          type: "info",
          message: "Retrieved existing page content"
        },
        {
          timestamp: "2025-07-04T14:31:35.000Z",
          type: "info",
          message: "Applying content modifications..."
        }
      ]
    }
  },

  // 4. Tool execution completed successfully
  {
    id: "msg_004",
    type: "tool",
    timestamp: "2025-07-04T14:32:45.000Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    toolName: "modify_page",
    toolId: "tool_modify_page_001",
    status: "completed",
    authenticationType: "confluence",
    data: {
      action: "**Modify Confluence Page**\n\nUpdating page: *Product Requirements Document*\n\n**Changes successfully applied:**\n- ✅ Add new feature requirements section\n- ✅ Update user acceptance criteria\n- ✅ Include technical specifications\n- ✅ Add timeline and milestones\n\n**Page URL:** [Product Requirements Document](https://company.atlassian.net/wiki/spaces/PROD/pages/123456789)",
      description: "Successfully modified the Confluence page with all requested changes",
      logs: [
        {
          timestamp: "2025-07-04T14:30:00.000Z",
          type: "info",
          message: "Tool call initiated for page modification"
        },
        {
          timestamp: "2025-07-04T14:30:01.000Z",
          type: "warning",
          message: "Authentication required for Confluence workspace access"
        },
        {
          timestamp: "2025-07-04T14:30:15.000Z",
          type: "info",
          message: "Successfully authenticated with Confluence workspace"
        },
        {
          timestamp: "2025-07-04T14:30:16.000Z",
          type: "info",
          message: "Waiting for user approval to proceed with page modifications"
        },
        {
          timestamp: "2025-07-04T14:31:30.000Z",
          type: "info",
          message: "User approved changes - starting page modification"
        },
        {
          timestamp: "2025-07-04T14:31:32.000Z",
          type: "info",
          message: "Retrieved existing page content"
        },
        {
          timestamp: "2025-07-04T14:31:35.000Z",
          type: "info",
          message: "Applying content modifications..."
        },
        {
          timestamp: "2025-07-04T14:32:20.000Z",
          type: "info",
          message: "Updated page sections and formatting"
        },
        {
          timestamp: "2025-07-04T14:32:40.000Z",
          type: "info",
          message: "Saved page changes successfully"
        },
        {
          timestamp: "2025-07-04T14:32:45.000Z",
          type: "info",
          message: "Page modification completed successfully"
        }
      ]
    }
  },

  // 5. Text confirmation message - chunk 1
  {
    id: "msg_005",
    type: "text",
    timestamp: "2025-07-04T14:32:50.000Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    response_delta: "Confluence page "
  },

  // 6. Text confirmation message - chunk 2
  {
    id: "msg_006",
    type: "text",
    timestamp: "2025-07-04T14:32:50.500Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    response_delta: "updated successfully! "
  },

  // 7. Text confirmation message - chunk 3
  {
    id: "msg_007",
    type: "text",
    timestamp: "2025-07-04T14:32:51.000Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    response_delta: "Go to "
  },

  // 8. Text confirmation message - chunk 4
  {
    id: "msg_008",
    type: "text",
    timestamp: "2025-07-04T14:32:51.500Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    response_delta: "this link "
  },

  // 9. Text confirmation message - chunk 5
  {
    id: "msg_009",
    type: "text",
    timestamp: "2025-07-04T14:32:52.000Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    response_delta: "to check "
  },

  // 10. Text confirmation message - chunk 6
  {
    id: "msg_010",
    type: "text",
    timestamp: "2025-07-04T14:32:52.500Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    response_delta: "the changes: "
  },

  // 11. Text confirmation message - chunk 7
  {
    id: "msg_011",
    type: "text",
    timestamp: "2025-07-04T14:32:53.000Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    response_delta: "[https://your-company.atlassian.net/wiki/spaces/PROD/pages/123456789/Product+Requirements+Document](https://your-company.atlassian.net/wiki/spaces/PROD/pages/123456789/Product+Requirements+Document)\n\n"
  },

  // 12. Text confirmation message - chunk 8
  {
    id: "msg_012",
    type: "text",
    timestamp: "2025-07-04T14:32:53.500Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    response_delta: "Perfect! I've "
  },

  // 13. Text confirmation message - chunk 9
  {
    id: "msg_013",
    type: "text",
    timestamp: "2025-07-04T14:32:54.000Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    response_delta: "successfully updated "
  },

  // 14. Text confirmation message - chunk 10
  {
    id: "msg_014",
    type: "text",
    timestamp: "2025-07-04T14:32:54.500Z",
    agent_id: "confluence_agent_001",
    agent_name: "Confluence Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
    response_delta: "your **Product "
  }
];

// Example 4: AllAi Agent - Orchestrator Handoff
const allAiAgent: StreamMessage[] = [
  // 1. Tool call initiated - analyzing user request
  {
    id: "msg_allai_001",
    type: "tool",
    timestamp: "2025-07-04T17:30:00.000Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    toolName: "handoff_to_agent",
    toolId: "tool_handoff_001",
    status: "in_progress",
    authenticationType: null,
    data: {
      action: "**Agent Handoff Analysis**\n\nAnalyzing request: *Create a bug report for the mobile login issue and update the project documentation*",
      description: "Determining which specialized agent should handle this multi-part request",
      logs: [
        {
          timestamp: "2025-07-04T17:30:00.000Z",
          type: "info",
          message: "Orchestrator analyzing user request"
        },
        {
          timestamp: "2025-07-04T17:30:02.000Z",
          type: "info",
          message: "Detected multiple tasks: JIRA issue creation and documentation update"
        },
        {
          timestamp: "2025-07-04T17:30:04.000Z",
          type: "info",
          message: "Evaluating available specialized agents..."
        }
      ]
    }
  },

  // 2. Analysis complete, determining handoff target
  {
    id: "msg_allai_002",
    type: "tool",
    timestamp: "2025-07-04T17:30:08.000Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    toolName: "handoff_to_agent",
    toolId: "tool_handoff_001",
    status: "in_progress",
    authenticationType: null,
    data: {
      action: "**Agent Handoff Analysis**\n\nAnalyzing request: *Create a bug report for the mobile login issue and update the project documentation*\n\n**Task Breakdown:**\n- 🔍 Primary: JIRA bug report creation\n- 📝 Secondary: Documentation update\n- 🎯 Recommended: Start with JIRA Agent for bug reporting",
      description: "Prioritizing tasks and selecting optimal agent for handoff",
      logs: [
        {
          timestamp: "2025-07-04T17:30:00.000Z",
          type: "info",
          message: "Orchestrator analyzing user request"
        },
        {
          timestamp: "2025-07-04T17:30:02.000Z",
          type: "info",
          message: "Detected multiple tasks: JIRA issue creation and documentation update"
        },
        {
          timestamp: "2025-07-04T17:30:04.000Z",
          type: "info",
          message: "Evaluating available specialized agents..."
        },
        {
          timestamp: "2025-07-04T17:30:06.000Z",
          type: "info",
          message: "JIRA Agent identified as primary handler"
        },
        {
          timestamp: "2025-07-04T17:30:08.000Z",
          type: "info",
          message: "Preparing handoff to JIRA Agent with context"
        }
      ]
    }
  },

  // 3. Tool execution completed - handoff ready
  {
    id: "msg_allai_003",
    type: "tool",
    timestamp: "2025-07-04T17:30:12.000Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    toolName: "handoff_to_agent",
    toolId: "tool_handoff_001",
    status: "completed",
    authenticationType: null,
    data: {
      action: "**Agent Handoff Analysis**\n\nAnalyzing request: *Create a bug report for the mobile login issue and update the project documentation*\n\n**Handoff Decision:**\n- ✅ Target Agent: JIRA Agent\n- ✅ Primary Task: Bug report creation\n- ✅ Context: Mobile login crashes, high priority\n- ✅ Follow-up: Documentation update via Confluence Agent\n\n**Handoff Status:** Ready to transfer",
      description: "Successfully analyzed request and prepared handoff to JIRA Agent",
      logs: [
        {
          timestamp: "2025-07-04T17:30:00.000Z",
          type: "info",
          message: "Orchestrator analyzing user request"
        },
        {
          timestamp: "2025-07-04T17:30:02.000Z",
          type: "info",
          message: "Detected multiple tasks: JIRA issue creation and documentation update"
        },
        {
          timestamp: "2025-07-04T17:30:04.000Z",
          type: "info",
          message: "Evaluating available specialized agents..."
        },
        {
          timestamp: "2025-07-04T17:30:06.000Z",
          type: "info",
          message: "JIRA Agent identified as primary handler"
        },
        {
          timestamp: "2025-07-04T17:30:08.000Z",
          type: "info",
          message: "Preparing handoff to JIRA Agent with context"
        },
        {
          timestamp: "2025-07-04T17:30:10.000Z",
          type: "info",
          message: "Handoff package prepared with task context"
        },
        {
          timestamp: "2025-07-04T17:30:12.000Z",
          type: "info",
          message: "Ready to transfer control to JIRA Agent"
        }
      ]
    }
  },

  // 4. Text confirmation message - chunk 1
  {
    id: "msg_allai_004",
    type: "text",
    timestamp: "2025-07-04T17:30:15.000Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "I understand "
  },

  // 5. Text confirmation message - chunk 2
  {
    id: "msg_allai_005",
    type: "text",
    timestamp: "2025-07-04T17:30:15.500Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "you need "
  },

  // 6. Text confirmation message - chunk 3
  {
    id: "msg_allai_006",
    type: "text",
    timestamp: "2025-07-04T17:30:16.000Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "to create "
  },

  // 7. Text confirmation message - chunk 4
  {
    id: "msg_allai_007",
    type: "text",
    timestamp: "2025-07-04T17:30:16.500Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "a bug "
  },

  // 8. Text confirmation message - chunk 5
  {
    id: "msg_allai_008",
    type: "text",
    timestamp: "2025-07-04T17:30:17.000Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "report for "
  },

  // 9. Text confirmation message - chunk 6
  {
    id: "msg_allai_009",
    type: "text",
    timestamp: "2025-07-04T17:30:17.500Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "the mobile "
  },

  // 10. Text confirmation message - chunk 7
  {
    id: "msg_allai_010",
    type: "text",
    timestamp: "2025-07-04T17:30:18.000Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "login issue "
  },

  // 11. Text confirmation message - chunk 8
  {
    id: "msg_allai_011",
    type: "text",
    timestamp: "2025-07-04T17:30:18.500Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "and update "
  },

  // 12. Text confirmation message - chunk 9
  {
    id: "msg_allai_012",
    type: "text",
    timestamp: "2025-07-04T17:30:19.000Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "project documentation. "
  },

  // 13. Text confirmation message - chunk 10
  {
    id: "msg_allai_013",
    type: "text",
    timestamp: "2025-07-04T17:30:19.500Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "Let me "
  },

  // 14. Text confirmation message - chunk 11
  {
    id: "msg_allai_014",
    type: "text",
    timestamp: "2025-07-04T17:30:20.000Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "hand this "
  },

  // 15. Text confirmation message - chunk 12
  {
    id: "msg_allai_015",
    type: "text",
    timestamp: "2025-07-04T17:30:20.500Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "over to "
  },

  // 16. Text confirmation message - chunk 13
  {
    id: "msg_allai_016",
    type: "text",
    timestamp: "2025-07-04T17:30:21.000Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "our **JIRA "
  },

  // 17. Text confirmation message - chunk 14 (final)
  {
    id: "msg_allai_017",
    type: "text",
    timestamp: "2025-07-04T17:30:21.500Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "Agent** who "
  },

  // 18. Text confirmation message - chunk 15 (final)
  {
    id: "msg_allai_018",
    type: "text",
    timestamp: "2025-07-04T17:30:22.000Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "will handle "
  },

  // 19. Text confirmation message - chunk 16 (final)
  {
    id: "msg_allai_019",
    type: "text",
    timestamp: "2025-07-04T17:30:22.500Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "the bug "
  },

  // 20. Text confirmation message - chunk 17 (final)
  {
    id: "msg_allai_020",
    type: "text",
    timestamp: "2025-07-04T17:30:23.000Z",
    agent_id: "allai_agent_001",
    agent_name: "AllAi Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
    response_delta: "report creation."
  }
];

// Example 3: JIRA Agent - Create Issue
const jiraAgent: StreamMessage[] = [
  // 1. Tool call initiated - waiting for authentication
  {
    id: "msg_jira_001",
    type: "tool",
    timestamp: "2025-07-04T16:45:00.000Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    toolName: "create_issue",
    toolId: "tool_create_issue_001",
    status: "waiting_for_authentication",
    authenticationType: "jira",
    data: {
      action: "**Create JIRA Issue**\n\nIssue Type: *Bug*\nProject: *WEBAPP*",
      description: "Creating a new bug report in the WEBAPP project",
      logs: [
        {
          timestamp: "2025-07-04T16:45:00.000Z",
          type: "info",
          message: "Issue creation tool call initiated"
        },
        {
          timestamp: "2025-07-04T16:45:01.000Z",
          type: "warning",
          message: "JIRA authentication required to create issue"
        }
      ]
    }
  },

  // 2. Authentication completed, waiting for user approval
  {
    id: "msg_jira_002",
    type: "tool",
    timestamp: "2025-07-04T16:45:18.000Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    toolName: "create_issue",
    toolId: "tool_create_issue_001",
    status: "waiting_user_approval",
    authenticationType: "jira",
    data: {
      action: "**Create JIRA Issue**\n\nIssue Type: *Bug*\nProject: *WEBAPP*\n\n**Issue Details:**\n- Summary: Login page crashes on mobile devices\n- Priority: High\n- Assignee: Development Team\n- Components: Frontend, Mobile\n- Labels: mobile, login, crash",
      description: "Ready to create JIRA issue - pending user approval for the bug report details",
      logs: [
        {
          timestamp: "2025-07-04T16:45:00.000Z",
          type: "info",
          message: "Issue creation tool call initiated"
        },
        {
          timestamp: "2025-07-04T16:45:01.000Z",
          type: "warning",
          message: "JIRA authentication required to create issue"
        },
        {
          timestamp: "2025-07-04T16:45:18.000Z",
          type: "info",
          message: "Successfully authenticated with JIRA instance"
        },
        {
          timestamp: "2025-07-04T16:45:19.000Z",
          type: "info",
          message: "Waiting for user approval to create JIRA issue"
        }
      ]
    }
  },

  // 3. User approved, tool execution in progress
  {
    id: "msg_jira_003",
    type: "tool",
    timestamp: "2025-07-04T16:46:12.000Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    toolName: "create_issue",
    toolId: "tool_create_issue_001",
    status: "in_progress",
    authenticationType: "jira",
    data: {
      action: "**Create JIRA Issue**\n\nIssue Type: *Bug*\nProject: *WEBAPP*\n\n**Progress:**\n- ✅ Validated issue fields\n- 🔄 Creating issue in JIRA\n- ⏳ Setting assignee and labels\n- ⏳ Generating issue key",
      description: "Actively creating the JIRA issue with specified details",
      logs: [
        {
          timestamp: "2025-07-04T16:45:00.000Z",
          type: "info",
          message: "Issue creation tool call initiated"
        },
        {
          timestamp: "2025-07-04T16:45:01.000Z",
          type: "warning",
          message: "JIRA authentication required to create issue"
        },
        {
          timestamp: "2025-07-04T16:45:18.000Z",
          type: "info",
          message: "Successfully authenticated with JIRA instance"
        },
        {
          timestamp: "2025-07-04T16:45:19.000Z",
          type: "info",
          message: "Waiting for user approval to create JIRA issue"
        },
        {
          timestamp: "2025-07-04T16:46:12.000Z",
          type: "info",
          message: "User approved issue creation - starting process"
        },
        {
          timestamp: "2025-07-04T16:46:14.000Z",
          type: "info",
          message: "Validating issue fields and project permissions"
        },
        {
          timestamp: "2025-07-04T16:46:16.000Z",
          type: "info",
          message: "Creating issue in WEBAPP project..."
        }
      ]
    }
  },

  // 4. Tool execution completed successfully
  {
    id: "msg_jira_004",
    type: "tool",
    timestamp: "2025-07-04T16:46:35.000Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    toolName: "create_issue",
    toolId: "tool_create_issue_001",
    status: "completed",
    authenticationType: "jira",
    data: {
      action: "**Create JIRA Issue**\n\nIssue Type: *Bug*\nProject: *WEBAPP*\n\n**Issue Created Successfully:**\n- ✅ Issue Key: WEBAPP-1247\n- ✅ Summary: Login page crashes on mobile devices\n- ✅ Priority: High\n- ✅ Assignee: Development Team\n- ✅ Labels and components added\n\n**Issue URL:** [WEBAPP-1247](https://your-company.atlassian.net/browse/WEBAPP-1247)",
      description: "Successfully created JIRA issue with all specified details",
      logs: [
        {
          timestamp: "2025-07-04T16:45:00.000Z",
          type: "info",
          message: "Issue creation tool call initiated"
        },
        {
          timestamp: "2025-07-04T16:45:01.000Z",
          type: "warning",
          message: "JIRA authentication required to create issue"
        },
        {
          timestamp: "2025-07-04T16:45:18.000Z",
          type: "info",
          message: "Successfully authenticated with JIRA instance"
        },
        {
          timestamp: "2025-07-04T16:45:19.000Z",
          type: "info",
          message: "Waiting for user approval to create JIRA issue"
        },
        {
          timestamp: "2025-07-04T16:46:12.000Z",
          type: "info",
          message: "User approved issue creation - starting process"
        },
        {
          timestamp: "2025-07-04T16:46:14.000Z",
          type: "info",
          message: "Validating issue fields and project permissions"
        },
        {
          timestamp: "2025-07-04T16:46:16.000Z",
          type: "info",
          message: "Creating issue in WEBAPP project..."
        },
        {
          timestamp: "2025-07-04T16:46:25.000Z",
          type: "info",
          message: "Issue created with key WEBAPP-1247"
        },
        {
          timestamp: "2025-07-04T16:46:30.000Z",
          type: "info",
          message: "Applied labels, components, and assignee"
        },
        {
          timestamp: "2025-07-04T16:46:35.000Z",
          type: "info",
          message: "JIRA issue creation completed successfully"
        }
      ]
    }
  },

  // 5. Text confirmation message - chunk 1
  {
    id: "msg_jira_005",
    type: "text",
    timestamp: "2025-07-04T16:46:40.000Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    response_delta: "JIRA issue "
  },

  // 6. Text confirmation message - chunk 2
  {
    id: "msg_jira_006",
    type: "text",
    timestamp: "2025-07-04T16:46:40.500Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    response_delta: "created successfully! "
  },

  // 7. Text confirmation message - chunk 3
  {
    id: "msg_jira_007",
    type: "text",
    timestamp: "2025-07-04T16:46:41.000Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    response_delta: "Issue key: "
  },

  // 8. Text confirmation message - chunk 4
  {
    id: "msg_jira_008",
    type: "text",
    timestamp: "2025-07-04T16:46:41.500Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    response_delta: "**WEBAPP-1247** "
  },

  // 9. Text confirmation message - chunk 5
  {
    id: "msg_jira_009",
    type: "text",
    timestamp: "2025-07-04T16:46:42.000Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    response_delta: "View it "
  },

  // 10. Text confirmation message - chunk 6
  {
    id: "msg_jira_010",
    type: "text",
    timestamp: "2025-07-04T16:46:42.500Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    response_delta: "here: "
  },

  // 11. Text confirmation message - chunk 7
  {
    id: "msg_jira_011",
    type: "text",
    timestamp: "2025-07-04T16:46:43.000Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    response_delta: "[https://your-company.atlassian.net/browse/WEBAPP-1247](https://your-company.atlassian.net/browse/WEBAPP-1247)\n\n"
  },

  // 12. Text confirmation message - chunk 8
  {
    id: "msg_jira_012",
    type: "text",
    timestamp: "2025-07-04T16:46:43.500Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    response_delta: "The bug "
  },

  // 13. Text confirmation message - chunk 9
  {
    id: "msg_jira_013",
    type: "text",
    timestamp: "2025-07-04T16:46:44.000Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    response_delta: "report has "
  },

  // 14. Text confirmation message - chunk 10
  {
    id: "msg_jira_014",
    type: "text",
    timestamp: "2025-07-04T16:46:44.500Z",
    agent_id: "jira_agent_001",
    agent_name: "JIRA Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
    response_delta: "been assigned "
  }
];

// Example 2: Salesforce Agent - Execute SOQL Query
const salesforceAgent: StreamMessage[] = [
  // 1. Tool call initiated - waiting for authentication
  {
    id: "msg_sf_001",
    type: "tool",
    timestamp: "2025-07-04T15:15:00.000Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    toolName: "execute_soql_query",
    toolId: "tool_soql_001",
    status: "waiting_for_authentication",
    authenticationType: "salesforce",
    data: {
      action: "**Execute SOQL Query**\n\nQuery: *SELECT Id, Name, CreatedDate, Amount, StageName FROM Opportunity ORDER BY CreatedDate DESC LIMIT 5*",
      description: "Retrieving the five latest opportunity records from Salesforce",
      logs: [
        {
          timestamp: "2025-07-04T15:15:00.000Z",
          type: "info",
          message: "SOQL query tool call initiated"
        },
        {
          timestamp: "2025-07-04T15:15:01.000Z",
          type: "warning",
          message: "Salesforce authentication required to execute query"
        }
      ]
    }
  },

  // 2. Authentication completed, waiting for user approval
  {
    id: "msg_sf_002",
    type: "tool",
    timestamp: "2025-07-04T15:15:20.000Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    toolName: "execute_soql_query",
    toolId: "tool_soql_001",
    status: "waiting_user_approval",
    authenticationType: "salesforce",
    data: {
      action: "**Execute SOQL Query**\n\nQuery: *SELECT Id, Name, CreatedDate, Amount, StageName FROM Opportunity ORDER BY CreatedDate DESC LIMIT 5*\n\n**Query will retrieve:**\n- Opportunity ID and Name\n- Creation Date\n- Deal Amount\n- Current Stage\n- Limited to 5 most recent records",
      description: "Ready to execute SOQL query - pending user approval to access Salesforce data",
      logs: [
        {
          timestamp: "2025-07-04T15:15:00.000Z",
          type: "info",
          message: "SOQL query tool call initiated"
        },
        {
          timestamp: "2025-07-04T15:15:01.000Z",
          type: "warning",
          message: "Salesforce authentication required to execute query"
        },
        {
          timestamp: "2025-07-04T15:15:20.000Z",
          type: "info",
          message: "Successfully authenticated with Salesforce org"
        },
        {
          timestamp: "2025-07-04T15:15:21.000Z",
          type: "info",
          message: "Waiting for user approval to execute SOQL query"
        }
      ]
    }
  },

  // 3. User approved, tool execution in progress
  {
    id: "msg_sf_003",
    type: "tool",
    timestamp: "2025-07-04T15:16:05.000Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    toolName: "execute_soql_query",
    toolId: "tool_soql_001",
    status: "in_progress",
    authenticationType: "salesforce",
    data: {
      action: "**Execute SOQL Query**\n\nQuery: *SELECT Id, Name, CreatedDate, Amount, StageName FROM Opportunity ORDER BY CreatedDate DESC LIMIT 5*\n\n**Status:**\n- 🔄 Executing query against Salesforce database\n- ⏳ Retrieving opportunity records\n- ⏳ Processing results",
      description: "Actively executing SOQL query to retrieve latest opportunity records",
      logs: [
        {
          timestamp: "2025-07-04T15:15:00.000Z",
          type: "info",
          message: "SOQL query tool call initiated"
        },
        {
          timestamp: "2025-07-04T15:15:01.000Z",
          type: "warning",
          message: "Salesforce authentication required to execute query"
        },
        {
          timestamp: "2025-07-04T15:15:20.000Z",
          type: "info",
          message: "Successfully authenticated with Salesforce org"
        },
        {
          timestamp: "2025-07-04T15:15:21.000Z",
          type: "info",
          message: "Waiting for user approval to execute SOQL query"
        },
        {
          timestamp: "2025-07-04T15:16:05.000Z",
          type: "info",
          message: "User approved query - starting execution"
        },
        {
          timestamp: "2025-07-04T15:16:07.000Z",
          type: "info",
          message: "Connecting to Salesforce API..."
        },
        {
          timestamp: "2025-07-04T15:16:10.000Z",
          type: "info",
          message: "Executing SOQL query..."
        }
      ]
    }
  },

  // 4. Tool execution completed successfully
  {
    id: "msg_sf_004",
    type: "tool",
    timestamp: "2025-07-04T15:16:25.000Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    toolName: "execute_soql_query",
    toolId: "tool_soql_001",
    status: "completed",
    authenticationType: "salesforce",
    data: {
      action: "**Execute SOQL Query**\n\nQuery: *SELECT Id, Name, CreatedDate, Amount, StageName FROM Opportunity ORDER BY CreatedDate DESC LIMIT 5*\n\n**Results:**\n- ✅ Query executed successfully\n- ✅ Retrieved 5 opportunity records\n- ✅ Data processed and formatted\n\n**Records Found:** 5 opportunities",
      description: "Successfully executed SOQL query and retrieved the latest opportunity records",
      logs: [
        {
          timestamp: "2025-07-04T15:15:00.000Z",
          type: "info",
          message: "SOQL query tool call initiated"
        },
        {
          timestamp: "2025-07-04T15:15:01.000Z",
          type: "warning",
          message: "Salesforce authentication required to execute query"
        },
        {
          timestamp: "2025-07-04T15:15:20.000Z",
          type: "info",
          message: "Successfully authenticated with Salesforce org"
        },
        {
          timestamp: "2025-07-04T15:15:21.000Z",
          type: "info",
          message: "Waiting for user approval to execute SOQL query"
        },
        {
          timestamp: "2025-07-04T15:16:05.000Z",
          type: "info",
          message: "User approved query - starting execution"
        },
        {
          timestamp: "2025-07-04T15:16:07.000Z",
          type: "info",
          message: "Connecting to Salesforce API..."
        },
        {
          timestamp: "2025-07-04T15:16:10.000Z",
          type: "info",
          message: "Executing SOQL query..."
        },
        {
          timestamp: "2025-07-04T15:16:20.000Z",
          type: "info",
          message: "Query executed successfully, processing results"
        },
        {
          timestamp: "2025-07-04T15:16:25.000Z",
          type: "info",
          message: "Retrieved and formatted 5 opportunity records"
        }
      ]
    }
  },

  // 5. Text confirmation message - chunk 1
  {
    id: "msg_sf_005",
    type: "text",
    timestamp: "2025-07-04T15:16:30.000Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    response_delta: "Here are "
  },

  // 6. Text confirmation message - chunk 2
  {
    id: "msg_sf_006",
    type: "text",
    timestamp: "2025-07-04T15:16:30.500Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    response_delta: "your five "
  },

  // 7. Text confirmation message - chunk 3
  {
    id: "msg_sf_007",
    type: "text",
    timestamp: "2025-07-04T15:16:31.000Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    response_delta: "latest opportunity "
  },

  // 8. Text confirmation message - chunk 4
  {
    id: "msg_sf_008",
    type: "text",
    timestamp: "2025-07-04T15:16:31.500Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    response_delta: "records from "
  },

  // 9. Text confirmation message - chunk 5
  {
    id: "msg_sf_009",
    type: "text",
    timestamp: "2025-07-04T15:16:32.000Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    response_delta: "Salesforce:\n\n"
  },

  // 10. Text confirmation message - chunk 6
  {
    id: "msg_sf_010",
    type: "text",
    timestamp: "2025-07-04T15:16:32.500Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    response_delta: "**1. Enterprise "
  },

  // 11. Text confirmation message - chunk 7
  {
    id: "msg_sf_011",
    type: "text",
    timestamp: "2025-07-04T15:16:33.000Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    response_delta: "Software Deal**\n"
  },

  // 12. Text confirmation message - chunk 8
  {
    id: "msg_sf_012",
    type: "text",
    timestamp: "2025-07-04T15:16:33.500Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    response_delta: "Amount: $250,000 "
  },

  // 13. Text confirmation message - chunk 9
  {
    id: "msg_sf_013",
    type: "text",
    timestamp: "2025-07-04T15:16:34.000Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    response_delta: "| Stage: "
  },

  // 14. Text confirmation message - chunk 10
  {
    id: "msg_sf_014",
    type: "text",
    timestamp: "2025-07-04T15:16:34.500Z",
    agent_id: "salesforce_agent_001",
    agent_name: "Salesforce Agent",
    agent_icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    response_delta: "Proposal/Price Quote\n\n"
  }
];


Use this as a map that decides in agentRouter which agent allAiAgent should call if no words from this list is mentioned allAiAgent should reply with text stream telling "Hello I am AllAi agent how can I help you today?"

const agentMappingKeywords = {
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

 }